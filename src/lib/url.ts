/**
 * Prefix a site-root path with the configured base (import.meta.env.BASE_URL).
 *
 * Only touches paths that start with "/" — i.e. local site-absolute paths to
 * assets in public/ or to internal routes. Anything else is returned as-is:
 *   - "#anchor"           → unchanged (in-page links, placeholders)
 *   - "https://cdn/x.jpg" → unchanged (future cloud-hosted images)
 *   - "mailto:" / "tel:"  → unchanged
 *   - relative paths       → unchanged
 *
 * Because it keys off BASE_URL, it adapts automatically: deploying under
 * "/LishengWEB/" today and at a custom domain ("/") later needs no edits.
 */
const BASE = import.meta.env.BASE_URL;

export function withBase(path?: string): string | undefined {
  if (!path || !path.startsWith("/")) return path;
  return BASE.replace(/\/$/, "") + path;
}
