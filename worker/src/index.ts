export default {
  async fetch(
    request: Request,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Remove trailing slash for consistency (except for root)
    const normalizedPath =
      pathname === "/" ? pathname : pathname.replace(/\/$/, "");

    // Check if the path already has a version prefix (/v1/ or /v2/)
    const hasVersionPrefix = /^\/v[12]\//.test(normalizedPath);

    // Case 1: Root path → redirect to /v2/
    if (normalizedPath === "/" || normalizedPath === "") {
      url.pathname = "/v2/";
      return Response.redirect(url.toString(), 301);
    }

    // Case 2: Already versioned (/v1/* or /v2/*) → proxy through
    if (hasVersionPrefix) {
      return fetch(request);
    }

    // Case 3: Excluded paths (static assets, APIs, etc.)
    const excludedPaths = [
      "/favicon.svg",
      "/favicon.ico",
      "/logo/",
      "/snippets/",
      "/background.png",
      "/_next/",
      "/api/",
      ".xml",
      ".txt",
      ".json",
      ".js",
      ".css",
    ];
    const shouldExclude = excludedPaths.some((excluded) => {
      if (excluded.startsWith(".")) {
        return normalizedPath.endsWith(excluded); // File extensions
      }
      if (excluded.endsWith("/")) {
        return normalizedPath.startsWith(excluded); // Directory paths
      }
      return normalizedPath.includes(excluded);
    });

    if (shouldExclude) {
      return fetch(request);
    }

    // Case 4: Unversioned path → redirect to /v1/*
    url.pathname = `/v1${normalizedPath}`;
    return Response.redirect(url.toString(), 301);
  },
};
