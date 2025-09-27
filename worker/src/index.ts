/**
 * Cloudflare Worker for Flipt Documentation Redirects
 * 
 * This worker handles backward compatibility for v1 documentation URLs
 * that were previously at the root level.
 */

export interface Env {
  // The origin URL where the actual documentation is hosted
  ORIGIN_URL: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    // Get the origin URL from environment or use a default
    const originUrl = env.ORIGIN_URL || 'http://localhost:3000';
    
    // Remove trailing slash for consistency (except for root)
    const normalizedPath = pathname === '/' ? pathname : pathname.replace(/\/$/, '');
    
    // Check if the path already has a version prefix (v1/ or v2/)
    const hasVersionPrefix = /^\/v[12]\//.test(normalizedPath);
    
    // Helper function to forward request to origin
    const forwardToOrigin = async (): Promise<Response> => {
      // Create new URL with origin host but same path
      const originRequestUrl = new URL(url.pathname + url.search, originUrl);
      
      // Create a new request with the origin URL
      const originRequest = new Request(originRequestUrl.toString(), {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: 'manual', // Don't follow redirects automatically
      });
      
      // Forward the request to the origin
      const response = await fetch(originRequest);
      
      // Return the response, preserving headers
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    };
    
    // If the request has a version prefix, pass through to origin
    if (hasVersionPrefix) {
      return forwardToOrigin();
    }
    
    // If this is the root path, pass through to origin
    if (normalizedPath === '/' || normalizedPath === '') {
      return forwardToOrigin();
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
      '.json',    // JSON files
      '.js',      // JavaScript files
      '.css',     // CSS files
    ];
    
    // Check if the path should be excluded from redirection
    const shouldExclude = excludedPaths.some(excluded => {
      if (excluded.startsWith('.')) {
        // File extensions
        return normalizedPath.endsWith(excluded);
      }
      if (excluded.endsWith('/')) {
        // Directory paths
        return normalizedPath.startsWith(excluded);
      }
      return normalizedPath.includes(excluded);
    });
    
    if (shouldExclude) {
      // Pass through to origin for excluded paths
      return forwardToOrigin();
    }
    
    // For all other paths without version prefix, redirect to v1
    // This maintains backward compatibility for existing v1 links
    const redirectUrl = new URL(url);
    redirectUrl.pathname = `/v1${normalizedPath}`;
    
    // Use 301 (permanent redirect) to help with SEO
    return Response.redirect(redirectUrl.toString(), 301);
  },
};