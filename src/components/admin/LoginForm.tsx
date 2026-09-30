"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { inputCls } from "./fields";

export function LoginForm({ configured }: { configured: boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    }).catch(() => null);
    if (res?.ok) return window.location.reload();
    const json = res ? await res.json().catch(() => ({})) : {};
    setError(json.error || "Could not log in.");
    setBusy(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-5 rounded-3xl border border-[#E4DDD2] bg-white/85 p-8 shadow-[0_24px_60px_rgba(23,20,15,0.08)] backdrop-blur">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-grad text-white">
          <Lock className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[#17140F]">Admin login</h1>
          <p className="mt-1 text-sm text-[#5C564E]">Edit everything on your portfolio.</p>
        </div>
        {configured ? (
          <>
            <input
              type="password"
              autoFocus
              autoComplete="current-password"
              placeholder="Password"
              className={inputCls}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
            <button
              disabled={busy || !password}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#17140F] py-3 text-sm font-bold text-white disabled:opacity-40 cursor-pointer"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" />} Log in
            </button>
          </>
        ) : (
          <p className="rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-800">
            No admin password is set yet. Add an <code>ADMIN_PASSWORD</code> environment variable (in <code>.env.local</code> or in Vercel) and restart.
          </p>
        )}
      </form>
    </div>
  );
}
