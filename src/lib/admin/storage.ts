import "server-only";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { CONTENT_FILES, type ContentBundle, type ContentKey } from "./files";

// Local mode only runs under `next dev`; the ignore hint stops the build from
// tracing the whole project into the serverless bundle because of these paths.
const projectPath = (file: string) => path.join(/* turbopackIgnore: true */ process.cwd(), file);

/**
 * Where admin edits are stored.
 *
 * - "github": set GITHUB_TOKEN + GITHUB_REPO (e.g. "owner/repo"). Edits become one
 *   commit on GITHUB_BRANCH (default "main"), and Vercel redeploys the site from it.
 * - "local": `next dev` without a token writes straight into the project files.
 */
export type StorageMode = "github" | "local" | "unconfigured";

export function storageMode(): StorageMode {
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) return "github";
  if (process.env.NODE_ENV !== "production") return "local";
  return "unconfigured";
}

export type PendingFile = { path: string; content: string; encoding: "utf-8" | "base64" };

const branch = () => process.env.GITHUB_BRANCH || "main";

async function github<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPO}${endpoint}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
    },
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`GitHub ${init?.method ?? "GET"} ${endpoint} failed (${res.status}): ${detail.slice(0, 200)}`);
  }
  return res.json() as Promise<T>;
}

function parseJson(text: string) {
  return JSON.parse(text.replace(/^﻿/, ""));
}

/** Reads every content file: from GitHub in "github" mode (so the panel shows the latest commit), else from disk. */
export async function readContent(): Promise<ContentBundle> {
  const mode = storageMode();
  const entries = await Promise.all(
    (Object.entries(CONTENT_FILES) as [ContentKey, string][]).map(async ([key, file]) => {
      if (mode === "github") {
        const data = await github<{ content: string }>(`/contents/${file}?ref=${encodeURIComponent(branch())}`);
        return [key, parseJson(Buffer.from(data.content, "base64").toString("utf8"))] as const;
      }
      return [key, parseJson(await readFile(projectPath(file), "utf8"))] as const;
    }),
  );
  return Object.fromEntries(entries) as ContentBundle;
}

/** Writes all files at once. Returns the commit URL in "github" mode. */
export async function writeFiles(files: PendingFile[], message: string): Promise<{ commitUrl?: string }> {
  const mode = storageMode();

  if (mode === "local") {
    for (const f of files) {
      const target = projectPath(f.path);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, f.encoding === "base64" ? Buffer.from(f.content, "base64") : f.content);
    }
    return {};
  }

  if (mode !== "github") throw new Error("Storage is not configured (set GITHUB_TOKEN and GITHUB_REPO)");

  // One commit for the whole save: blobs -> tree -> commit -> move the branch
  const ref = await github<{ object: { sha: string } }>(`/git/ref/heads/${branch()}`);
  const parent = await github<{ tree: { sha: string } }>(`/git/commits/${ref.object.sha}`);
  const tree = await Promise.all(
    files.map(async (f) => {
      const blob = await github<{ sha: string }>("/git/blobs", {
        method: "POST",
        body: JSON.stringify({ content: f.content, encoding: f.encoding }),
      });
      return { path: f.path, mode: "100644", type: "blob", sha: blob.sha };
    }),
  );
  const newTree = await github<{ sha: string }>("/git/trees", {
    method: "POST",
    body: JSON.stringify({ base_tree: parent.tree.sha, tree }),
  });
  const commit = await github<{ sha: string; html_url: string }>("/git/commits", {
    method: "POST",
    body: JSON.stringify({ message, tree: newTree.sha, parents: [ref.object.sha] }),
  });
  await github(`/git/refs/heads/${branch()}`, { method: "PATCH", body: JSON.stringify({ sha: commit.sha }) });
  return { commitUrl: commit.html_url };
}
