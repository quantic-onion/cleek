# 🌙 Cleek

A lightweight Vue 3 component library.

When you are starting a new prototype you want to be able to develop features fast. We created this component library as a way for us to build products quickly without having to deal with complicated packages and a huge bundle sizes.

## Usage

First install the library using your prefered package manager

```bash
yarn add cleek
```

then you can import the available components like so

```vue
import { Button } from cleek
```

## Available commands

Here is a list of all available npm commands.

**Starting the dev environment**
We use Vue Press to hold our component documentation and examples

```bash
yarn dev
```

**Building the documentation**

```bash
yarn build
```

**Serving the documentation**

```bash
yarn serve
```

**Building the library bundles**

```bash
yarn build:library
```

**Analyzing bundle sizes with [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)**

```bash
yarn analyze
```

**Lint all files**

```bash
yarn lint
```

**Format all files**
```bash
yarn format
```
