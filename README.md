<br>
<div align="center">
    <h1>🧪 Micro frontends</h1>
    <strong>This POC aims to test several approaches to tackle micro frontend architecture.</strong>
</div>
<br>
<br>

## 🤔 Motivation

Multiple separate builds should form a single application. These separate builds should not have dependencies between each other, so they can be developed and deployed individually.
This is often known as Micro-Frontends, but is not limited to that.

## 🎯 Objectives

-   Independent deployment
-   Independent development: make it easier to work on a specific part of the application (disregarding the rest)
-   Easy state sharing between micro frontends
-   Easy code sharing between micro frontends
-   Smooth interaction between apps (it should feel like a SPA)
-   Reducing the size of the project you need to run locally

## 🧪 Experimentations

Following approaches were tested:
- [Build-time integration](https://github.com/adbayb/poc-micro-frontends/tree/buildtime): It consists of publishing each micro frontend as a package, and having the shell includes them all as library dependencies. It produces a single deployable Javascript bundle, as is usual, allowing us to de-duplicate common dependencies from our various applications. However, this approach means that we have to re-compile and release every single micro frontend in order to release a change to any individual part of the product. Just as with microservices, we've seen enough pain caused by such a lockstep release process that we would recommend strongly against this kind of approach to micro frontends. We should find a way to integrate our micro frontends at run-time, rather than at build-time.
- [Runtime integration with the same framework](https://github.com/adbayb/poc-micro-frontends/tree/runtime-single-framework): Integrates micro frontends at runtime (by integration, we mean mounting each micro frontend in the DOM and coordinating them). For this, several approaches could be done such as [iframe](https://martinfowler.com/articles/micro-frontends.html#Run-timeIntegrationViaIframes), [scripts](https://martinfowler.com/articles/micro-frontends.html#Run-timeIntegrationViaJavascript) or [web components](https://martinfowler.com/articles/micro-frontends.html#Run-timeIntegrationViaWebComponents) integration. Since we're using the same UI framework, we don't have interoperability constraints in contrast to a polyglot framework context. Consequently, web component integration integration is not necessary: we'll with a script integration through Webpack and its module federation plugin.
- [Runtime integration with polyglot frameworks](https://github.com/adbayb/poc-micro-frontends/tree/runtime-polyglot-frameworks): Same integration approach as the previous one but with a render shim on top of each polyglot micro frontend to guarantee interoperability between them. The interoperability layer could be implemented through a web component wrapper or a custom interface (for example, via single-spa router framework or via a custom function to abstract specific mounting operation for each micro frontend).


## 📦 Building blocks

- Shell: The shell (or [container](https://webpack.js.org/concepts/module-federation/#low-level-concepts)) is the root application orchestrator. It is the main entrypoint scaffolding the application skeleton and allows bootstraping the whole application (eg. registering applications, sharing core libraries...).
- Modules: A module (also called application, micro frontend or [remote module](https://webpack.js.org/concepts/module-federation/#low-level-concepts)) is a remote vertical consumed by the shell and/or other modules. It can have its own client-side routing and framework/libraries but can also share them with the shell/other modules.
- Shared: Libraries shared across shell and modules. They're key to enable cross-application communication and data management (eg. store, event management...).

## 📕 Resources

- [Architecture and concepts](https://martinfowler.com/articles/micro-frontends.html)
- [Module federation (optimization technique for micro frontends to share build-time applications/dependencies)](https://single-spa.js.org/)
- [Single-spa (router/orchestrator for micro frontends to integrate at runtime build-time applications/dependencies without page reloading)](https://single-spa.js.org/)
