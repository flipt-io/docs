# Flipt Docs

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)][codespaces]

This repository powers the content behind Flipt's docs at [flipt.io/docs](https://www.flipt.io/docs)

## 📝 Contributing

We welcome contributions to the documentation. If you find a typo or want to add a new section, please open a PR.

We use Conventional Commits to manage our commit messages. Please follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format when writing commit messages.

## Vale

We use [Vale](https://vale.sh) to lint our documentation. Vale is a command-line tool that brings code-like linting rules to prose. It's highly configurable and supports a number of different writing styles.

### Installation

To install Vale, follow the [installation instructions](https://vale.sh/docs/vale-cli/installation/).

Once installed run the following in this project:

```sh
vale sync
```

> Installs all the dependent Vale packages.

### Usage

To lint the documentation, run the following command at the root of the repository:

```shell
vale *
```

Vale will lint all files in the repository. If you want to lint a specific file, you can pass the file name as an argument:

```shell
vale README.md
```

Vale will lint the file and output any errors or warnings to the console.

### Configuration

Vale is configured using a YAML file called `.vale.ini`. This file is located in the root of the repository.

Our configuration file uses rules from the [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/). The full configuration can be found in the [.vale.ini](.vale.ini) file.

We also use a [custom style](https://docs.errata.ai/vale/styles) to lint our documentation. The style file can be found in the (.vale/styles/flipt)[.vale/styles/flipt) directory.

### Spelling Errors

If Vale detects a spelling error, it will output it as an error to the console. If you want to ignore a spelling error, you can add the word to the [spelling-execeptions](./vale/styles/Flipt/spelling-exceptions.txt) file in our custom style.

ℹ The words in this file are case-insensitive, please add the word in lowercase and in alphabetical order.

### CI

We use GitHub Actions to lint our documentation. The Vale action is run on every pull request and will comment any errors inline on the PR.

## 👩‍💻 Development

Install the [Mintlify CLI](https://www.npmjs.com/package/mintlify) to preview the documentation changes locally. To install, use the following command

```shell
npm i mintlify -g
```

Run the following command at the root of your documentation (where mint.json is)

```shell
mintlify dev
```

Note - `mintlify dev` requires `yarn` and it's recommended you install it as a global installation. If you don't have yarn installed already run `npm install --global yarn` in your terminal.

## 😎 Publishing Changes

Changes will be deployed to production automatically after pushing to the default branch.

You can also preview changes using PRs, which generates a preview link of the docs.

### Troubleshooting

- Mintlify dev isn't running - Run `mintlify install` it'll re-install dependencies.
- Mintlify dev is updating really slowly - Run `mintlify clear` to clear the cache.

[codespaces]: https://codespaces.new/flipt-io/docs?quickstart=1
