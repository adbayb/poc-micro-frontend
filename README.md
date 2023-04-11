<br>
<div align="center">
    <h1>🧪 Micro frontends</h1>
    <em>Micro-frontend architecture can be defined as <strong>an architectural style</strong> where <strong>independently deliverable</strong> frontend applications are <strong>composed into a greater whole</strong></em>
    <p><a href="./docs"><strong>Explore the documentation »</strong></a></p>
</div>
<br>
<br>

## 🚀 Quickstart

**1️⃣ Install**

```shell
pnpm i
```

**2️⃣ Enjoy**

```shell
pnpm start
```

<br>

## 🏗️ Architecture

The example includes the following components:

```mermaid
flowchart TD
    S(Shell):::strokeWidth -- Shares --> D("Dependencies"):::strokeWidth
    S -- Orchestrates --> ML("@micro-frontend/authentication"):::strokeWidth
    S -- Orchestrates --> MD("@micro-frontend/classifieds"):::strokeWidth
    ML -- Uses --> D
    MD -- Uses --> D
    style S fill:#ffe5ec,stroke:#ff8fab
    style D fill:#daf2d7,stroke:#90cf8e
    classDef strokeWidth stroke-width:3px
```

<br>

## 📖 Documentation

The full documentation is available [here](./docs).

<br>
