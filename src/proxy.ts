import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - /api routes
  // - /admin (the content editor is not localized)
  // - /_next (Next.js internals)
  // - static files such as /icon.svg or /brand/*.svg (anything with a dot)
  matcher: ["/((?!api|admin|_next|.*\..*).*)"],
};
