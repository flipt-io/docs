# Flipt Documentation Redirect Worker

This Cloudflare Worker handles backward compatibility redirects for the Flipt documentation site. It ensures that links to v1 documentation that were previously at the root level continue to work after the v1/v2 reorganization.

## How It Works

The worker intercepts requests and applies the following logic:

1. **Requests with version prefix** (`/v1/*` or `/v2/*`): Pass through unchanged
2. **Root requests** (`/`): Pass through unchanged
3. **Static assets** (favicon, logo, etc.): Pass through unchanged
4. **All other requests**: Redirect to `/v1/*` with a 301 permanent redirect

This ensures backward compatibility for existing v1 documentation links while allowing v2 to be the default for new visitors.

## Setup

### Prerequisites

- Node.js 18+ and npm
- Cloudflare account
- Wrangler CLI (installed via npm)

### Installation

```bash
cd worker
npm install
```

### Local Development

Run the worker locally for testing:

```bash
npm run dev
```

The worker will be available at `http://localhost:8787`

### Testing Redirect Logic

Test various paths to ensure the redirect logic works:

```bash
# Should redirect to /v1/concepts
curl -I http://localhost:8787/concepts

# Should NOT redirect (already has version)
curl -I http://localhost:8787/v1/concepts
curl -I http://localhost:8787/v2/introduction

# Should NOT redirect (root path)
curl -I http://localhost:8787/

# Should NOT redirect (static assets)
curl -I http://localhost:8787/favicon.svg
```

## Deployment

### 1. Configure Cloudflare Account

First, authenticate with Cloudflare:

```bash
npx wrangler login
```

### 2. Update Configuration

Edit `wrangler.toml` and update the production configuration:

```toml
[env.production]
route = "docs.flipt.io/*"  # Your documentation domain
zone_id = "YOUR_ZONE_ID"    # Found in Cloudflare dashboard
```

### 3. Deploy to Production

```bash
npm run deploy:production
```

### 4. Verify Deployment

After deployment, verify the worker is active:

```bash
# Check worker status
npx wrangler tail flipt-docs-redirect
```

## Configuration

### Excluded Paths

The worker excludes certain paths from redirection. Update the `excludedPaths` array in `src/index.ts` to add or remove exclusions:

```typescript
const excludedPaths = [
  '/favicon.svg',
  '/logo/',
  '/snippets/',
  '/background.png',
  '/_next/',
  '/api/',
  '.xml',
  '.txt',
];
```

### Environment Variables

If you need environment-specific configuration, you can add bindings in `wrangler.toml`:

```toml
[env.production.vars]
REDIRECT_VERSION = "v1"
ENABLE_LOGGING = "true"
```

## Monitoring

### View Real-time Logs

```bash
npx wrangler tail flipt-docs-redirect --env production
```

### Analytics

The worker includes observability configuration. View metrics in the Cloudflare dashboard under Workers > Analytics.

## Troubleshooting

### Common Issues

1. **Worker not triggering**: Ensure the route pattern in `wrangler.toml` matches your domain
2. **Infinite redirects**: Check that the redirect URL doesn't match the original pattern
3. **Assets not loading**: Add asset paths to the `excludedPaths` array

### Debug Mode

For debugging, you can add console.log statements that will appear in `wrangler tail`:

```typescript
console.log(`Request: ${pathname}, Redirecting: ${!hasVersionPrefix}`);
```

## Architecture Notes

- The worker runs at the edge, providing low-latency redirects globally
- Uses 301 permanent redirects for SEO preservation
- Minimal overhead - only processes URL patterns, doesn't modify content
- Stateless design - no external dependencies or storage requirements

## Contributing

When making changes:

1. Update the TypeScript code in `src/index.ts`
2. Test locally with `npm run dev`
3. Run type checking: `npm run typecheck`
4. Deploy to staging first: `npm run deploy:staging`
5. After verification, deploy to production: `npm run deploy:production`