# Flipt Docs PR Review Routing

This repository is the user-facing documentation for Flipt, built with
[Mintlify](https://mintlify.com/) from MDX files under `docs/`. Produce **one
combined PR review** for the pull request. Do not post separate reviews per
section or version.

## Changed-path routing

- Apply `.agents/pr-review/personas/docs-reviewer.md` for changes under
  `docs/**` — MDX pages (`docs/v1/`, `docs/v2/`), `docs/docs.json`, snippets,
  and images.
- For changes to GitHub Actions workflows, Vale configuration
  (`docs/.vale.ini`, `docs/.vale/`), lint/format tooling, or other repository
  metadata, review those changes directly using `AGENTS.md` plus the central
  `flipt-io/agents` code-review skill guidance.

## Review priorities

Prioritize findings that affect:

1. Technical accuracy: configuration keys, CLI commands, API examples, and
   described behavior must match how Flipt actually works. Flag anything that
   looks invented or contradicts other pages.
2. Version placement: Flipt v1.x content belongs in `docs/v1/`, v2.x content in
   `docs/v2/`; Pro/Cloud-only features must be labeled as such.
3. Navigation and links: new pages registered in `docs/docs.json`; internal
   links are relative paths that resolve; renamed or moved pages update every
   reference.
4. Required frontmatter (`title`, `description`) on every MDX file.
5. Code examples: language tags on all code blocks, complete and runnable
   examples, correct syntax for the version being documented.
6. Correct use of Mintlify components (`<Note>`, `<Warning>`, `<Tip>`,
   `<Tabs>`, `<CodeGroup>`, etc.) and valid MDX that will render.

Do not spend review budget on prose style already enforced by Vale or
formatting already enforced by Prettier in this repo's CI. Flag style only when
it obscures meaning or contradicts the documented behavior.
