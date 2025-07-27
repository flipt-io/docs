# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **user-facing** documentation repository for Flipt, a feature flag and experimentation platform. The documentation is built using [Mintlify](https://mintlify.com/) and hosted at [flipt.io/docs](https://www.flipt.io/docs).

## General Guidelines

- Use the [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/) for all writing.
- Make sure to use the correct tone and style for the target audience (developers, operators, etc.).
- While the audience is technical, try to avoid using technical jargon and explain concepts in a way that is easy to understand.
- **IMPORTANT**: Remember this is user-facing documentation, so we need to be very clear and concise and not go too deep into the technical details, but instead focus on how to use the product and how to configure it.
- Always run `npm run lint` and `npm run format` before committing any changes
- Run `mint dev` to spin up a docs preview page (long-running process) and use the puppeteer MCP tools (if available) to view the docs in a browser

## Development Commands

### Essential Commands

- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code using Prettier
- `vale sync` - Install Vale dependencies for documentation linting
- `vale *` - Lint all documentation files
- `vale README.md` - Lint specific file
- `mint dev` - Start local development server
- `mint rename` - Rename file in a Mintlify project and update the internal link references

### Publishing

Changes are automatically deployed to production when pushed to the main branch.

## Documentation Standards

### Writing Style

- Uses Vale for prose linting with Microsoft Writing Style Guide rules
- Custom Flipt style rules located in `.vale/styles/flipt/`
- Spelling exceptions in `.vale/styles/Flipt/spelling-exceptions.txt` (lowercase, alphabetical)
- Vale configuration in `.vale.ini`

### Commit Messages

- Follow Conventional Commits format
- Examples: `feat:`, `fix:`, `docs:`, `chore:`

## Architecture

### File Structure

- **Content**: All documentation files are in MDX format
- **Navigation**: Configured in `docs.json` with versioned navigation (v1 and v2)
- **Versions**: Supports both v1 (current) and v2 (beta) documentation
- **Images**: Organized by section in `images/` directories
- **Snippets**: Reusable content snippets in `snippets/`

### Key Directories

- `authentication/` - v1 Authentication documentation
- `authorization/` - v1 Authorization documentation
- `cli/` - v1 CLI command documentation
- `cloud/` - Flipt Cloud documentation
- `configuration/` - v1 Server configuration
- `guides/` - v1 User and operation guides
- `integration/` - v1 SDK and API integration docs
- `images/` - v1 documentation images
- `installation/` - v1 Installation documentation
- `reference/` - v1 API reference documentation
- `v2/` - v2 documentation
  - `v2/configuration/` - v2 Server configuration
  - `v2/guides/` - v2 User and operation guides
  - `v2/integration/` - v2 SDK and API integration docs
  - `v2/installation/` - v2 Installation documentation
  - `v2/images/` - v2 documentation images

### Documentation Tabs

- **Open Source**: Main Flipt documentation
- **Flipt Cloud**: Cloud-specific features and guides
- **API Reference**: Generated from OpenAPI spec at `https://raw.githubusercontent.com/flipt-io/flipt/main/openapi.yaml`

## Development Setup

1. Install Mintlify CLI globally: `npm i mint -g`
2. Install Vale for linting: Follow [Vale installation guide](https://vale.sh/docs/vale-cli/installation/)
3. Run `vale sync` to install Vale packages
4. Start development server: `mint dev`

## Code Quality

- ESLint with MDX support for linting
- Prettier for formatting
- Vale for prose linting with error-level spelling checks
- GitHub Actions run Vale on PRs with inline comments
