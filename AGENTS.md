# CLAUDE.md

This file provides guidance to AI Agents when working with code in this repository.

This is the **user-facing** documentation repository for Flipt, a feature flag and experimentation platform. The documentation is built using [Mintlify](https://mintlify.com/) and hosted at [flipt.io/docs](https://www.flipt.io/docs).

## Working Principles

- **Collaboration**: You can push back on ideas—this can lead to better documentation. Cite sources and explain your reasoning when you do so
- **Clarity**: ALWAYS ask for clarification rather than making assumptions
- **Accuracy**: NEVER lie, guess, or make up anything

## Project Structure

### Documentation Versions

The documentation is organized into two main versions:

- **`/v1`**: Legacy documentation for Flipt v1.x (open-source version)
- **`/v2`**: Current documentation for Flipt v2.x (including Pro features)

Both versions are maintained to support users on different versions of Flipt.

### Configuration

- **Format**: MDX files with YAML frontmatter
- **Config**: docs.json for navigation, theme, settings ([docs.json schema](https://mintlify.com/docs.json))
- **Components**: Mintlify components

### Cloudflare Worker

A Cloudflare Worker (`/worker`) handles automatic redirects from old v1 documentation paths to their new locations. This ensures backward compatibility for existing links and bookmarks.

- **Purpose**: Redirects old documentation URLs to new v1 or v2 paths
- **Configuration**: See `/worker/README.md` for deployment and configuration details
- **Testing**: Run `npm test` in the worker directory to validate redirect rules

### Required Frontmatter

- `title`: Clear, descriptive page title
- `description`: Concise summary for SEO/navigation

## Writing Guidelines

### Content Strategy

- Document just enough for user success - not too much, not too little
- Prioritize accuracy and usability
- Make content evergreen when possible
- Search for existing content before adding anything new
- Check existing patterns for consistency
- Start by making the smallest reasonable changes

### Writing Standards

- Use the [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/)
- Second-person voice ("you")
- Target audience: developers and operators
- Avoid technical jargon; explain concepts clearly
- Focus on how to use and configure the product (not deep technical internals)

### Technical Requirements

- Prerequisites at start of procedural content
- Test all code examples before publishing
- Match style and formatting of existing pages
- Include both basic and advanced use cases
- Language tags on all code blocks
- Alt text on all images
- Relative paths for internal links

### Link Formatting

- **Always use markdown link syntax**: `[Link Text](https://example.com)` instead of raw URLs
- **Use descriptive link text**: `[Installation guide](https://helm.sh/docs/intro/install/)`
- **Keep link text concise**: Use terms like "Download", "Installation guide", "Documentation"
- **Examples**:
  - ✅ Good: `Docker installed ([Download](https://www.docker.com/products/docker-desktop))`
  - ❌ Bad: `Docker installed (Download: https://www.docker.com/products/docker-desktop)`

## Git Workflow

- Create a new branch when no clear branch exists for changes
- Commit frequently throughout development
- Follow Conventional Commits format (`feat:`, `fix:`, `docs:`, `chore:`)
- NEVER use --no-verify when committing
- NEVER skip or disable pre-commit hooks
- Ask how to handle uncommitted changes before starting

## Development Commands

### Local Development

- `mint dev` - Start local development server
- `mint rename` - Rename file and update internal link references

### Code Quality

- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code using Prettier

### Documentation Linting

- `vale sync` - Install Vale dependencies for documentation linting
- `vale *` - Lint all documentation files
- `vale README.md` - Lint specific file

### Cloudflare Worker Commands

- `npm run dev` - Start worker development server
- `npm test` - Run redirect tests
- `npm run deploy` - Deploy worker to production

### Publishing

Changes are automatically deployed to production when pushed to the main branch.

## Quality Assurance

### Automated Checks

- ESLint with MDX support for linting
- Prettier for formatting
- Vale for prose linting with Microsoft Writing Style Guide rules
- GitHub Actions run Vale on PRs with inline comments

### Vale Configuration

- Custom Flipt style rules: `.vale/styles/flipt/`
- Spelling exceptions: `.vale/styles/Flipt/spelling-exceptions.txt` (lowercase, alphabetical)
- Configuration: `.vale.ini`

## Development Setup

1. Install Mintlify CLI globally: `npm i mint -g`
2. Install Vale for linting: Follow [Vale installation guide](https://vale.sh/docs/vale-cli/installation/)
3. Run `vale sync` to install Vale packages
4. Start development server: `mint dev`

## Do Not

- Skip frontmatter on any MDX file
- Use absolute URLs for internal links
- Include untested code examples
- Make assumptions - always ask for clarification
