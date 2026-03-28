import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/zh/docs/gdps-shanghai-2026-presentation",
        destination: "/zh/talks/gdps-shanghai-2026-presentation.html",
      },
      {
        source: "/zh/talks/gdps-shanghai-2026-presentation",
        destination: "/zh/talks/gdps-shanghai-2026-presentation.html",
      },
    ];
  },
};

export default nextConfig;
