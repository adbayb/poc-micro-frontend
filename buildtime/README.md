<br>
<div align="center">
    <h1>🧪 Micro-frontend buildtime integration</h1>
    <strong>Build-time integration exploration (package-driven development).</strong>
</div>
<br>
<br>

## 🚀 Quickstart

1️⃣ Install by running:

```bash
pnpm i
```

2️⃣ Try it by running:

```bash
npm start
```

<br>

## 🏗 Architecture

To manage shared dependencies (ie. `react`, `react-dom` and `@shared/context`) and avoid duplicating them, a `peerDependencies` strategy is used for each module. They're defined as dependencies in the application shell.  
Each micro frontend module is published as a package and the shell includes them all as library dependencies. It produces a single deployable Javascript bundle allowing us to de-duplicate common dependencies.

However, this approach means that we have to re-compile and release every single micro frontend in order to release a change to any individual part of the product.  
Besides, no sandbox has been configured to run each module in a standalone mode: it's another advantage of the micro frontend approach with module federation (it's supported built-in without any extra configuration).
