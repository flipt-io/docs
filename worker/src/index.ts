/**
 * Cloudflare Worker for Flipt Documentation Redirects
 * 
 * This worker handles backward compatibility for v1 documentation URLs
 * that were previously at the root level.
 */

export interface Env {
  // Environment bindings can be added here if needed
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    // Remove trailing slash for consistency (except for root)
    const normalizedPath = pathname === '/' ? pathname : pathname.replace(/\/$/, '');
    
    // Check if the path already has a version prefix (v1/ or v2/)
    const hasVersionPrefix = /^\/v[12]\//.test(normalizedPath);
    
    // If the request has a version prefix, pass through to origin
    if (hasVersionPrefix) {
      // Pass through to the origin unchanged
      return fetch(request);
    }
    
    // If this is the root path, pass through to origin
    if (normalizedPath === '/' || normalizedPath === '') {
      return fetch(request);
    }
    
    // List of paths that should not be redirected (static assets, etc.)
    const excludedPaths = [
      '/favicon.svg',
      '/logo/',
      '/snippets/',
      '/background.png',
      '/_next/',  // Next.js assets if Mintlify uses them
      '/api/',    // API endpoints
      '.xml',     // Sitemaps
      '.txt',     // Robots.txt, etc.
    ];
    
    // Check if the path should be excluded from redirection
    const shouldExclude = excludedPaths.some(excluded => {
      if (excluded.endsWith('/')) {
        return normalizedPath.startsWith(excluded);
      }
      return normalizedPath.includes(excluded);
    });
    
    if (shouldExclude) {
      // Pass through to origin for excluded paths
      return fetch(request);
    }
    
    // For all other paths without version prefix, redirect to v1
    // This maintains backward compatibility for existing v1 links
    const redirectUrl = new URL(url);
    redirectUrl.pathname = `/v1${normalizedPath}`;
    
    // Use 301 (permanent redirect) to help with SEO
    return Response.redirect(redirectUrl.toString(), 301);
  },
};