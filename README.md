# Flipt Docs

This repo powers the content behind Flipt's docs at [flipt.io/docs](https://www.flipt.io/docs)

### 👩‍💻 Development

Install the [Mintlify CLI](https://www.npmjs.com/package/mintlify) to preview the documentation changes locally. To install, use the following command

```
npm i mintlify -g
```

Run the following command at the root of your documentation (where mint.json is)

```
mintlify dev
```

Note - `mintlify dev` requires `yarn` and it's recommended you install it as a global installation. If you don't have yarn installed already run `npm install --global yarn` in your terminal.

### 😎 Publishing Changes

Changes will be deployed to production automatically after pushing to the default branch.

You can also preview changes using PRs, which generates a preview link of the docs.

#### Troubleshooting

- Mintlify dev isn't running - Run `mintlify install` it'll re-install dependencies.
- Mintlify dev is updating really slowly - Run `mintlify clear` to clear the cache.
