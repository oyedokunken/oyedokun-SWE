const isDev = process.env.NODE_ENV !== "production";

const apiOrigin = (() => {
  try {
    return process.env.NEXT_PUBLIC_API_URL ? new URL(process.env.NEXT_PUBLIC_API_URL).origin : "";
  } catch {
    return "";
  }
})();

// Next.js injects inline bootstrap scripts, so 'unsafe-inline' is required
// without a nonce-based setup. Everything else is locked to same-origin.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://avatars.githubusercontent.com https://purecatamphetamine.github.io",
  "font-src 'self' data:",
  `connect-src 'self' https://va.vercel-scripts.com ${apiOrigin} ${isDev ? "http://localhost:4000 ws:" : ""}`.trim(),
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Pages are negotiated between HTML and Markdown on Accept (proxy.ts).
      // Next's page runtime replaces any Vary set by the proxy, so the full
      // value (Accept plus Next's own RSC headers) is declared here for the
      // hosting layer to apply; dropping the RSC values would let a CDN serve
      // a cached RSC payload for a full page load.
      {
        source: "/((?!_next/|.*\\..*).*)",
        headers: [
          {
            key: "Vary",
            value: "Accept, rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "oyedokunken.vercel.app" }],
        destination: "https://www.oyedokun.dev/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
