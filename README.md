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

To quote [micro-frontends.org](https://micro-frontends.org/):

> "The idea behind Micro Frontends is to think about a website or web app as a composition of features which are owned by independent teams. Each team has a distinct area of business or mission it cares about and specialises in. A team is cross functional and develops its features end-to-end, from database to user interface."

## 🎯 Objectives

-   Independent deployment
-   Independent development: make it easier to work on a specific part of the application (disregarding the rest)
-   Easy state sharing between micro frontends
-   Easy code sharing between micro frontends
-   Smooth interaction between apps (it should feel like a SPA)
-   Reducing the size of the project you need to run locally

## 🧪 Experimentations

Integration (or composition) between the container (aka shell here) and the micro frontends (aka modules here) is one of the main challenge. There's a natural architecture that arises across all the approaches: usually, there is a container application that renders common page elements, addresses cross-cutting concerns, and brings many micro frontends together on a page while informing the micro frontend where and when to render itself. Let's take a look at different micro frontend architecture composition approaches that can be used:

- [Build-time (or compile-time) composition](./buildtime): It consists of publishing each micro frontend as a package, and having the shell includes them all as library dependencies. It produces a single deployable Javascript bundle, as is usual, allowing us to de-duplicate common dependencies from our various applications. However, this approach means that we have to re-compile and release every single micro frontend in order to release a change to any individual part of the product. Just as with microservices, we've seen enough pain caused by such a lockstep release process that we would recommend strongly against this kind of approach to micro frontends. We should find a way to integrate our micro frontends at runtime, rather than at build-time.
- [Run-time composition with monoglot framework](./runtime-monoglot): Integrates micro frontends at runtime (by integration, we mean mounting each micro frontend in the DOM and coordinating them). For this, several approaches could be done such as [iframe](https://martinfowler.com/articles/micro-frontends.html#Run-timeIntegrationViaIframes), [scripts](https://martinfowler.com/articles/micro-frontends.html#Run-timeIntegrationViaJavascript) or [web components](https://martinfowler.com/articles/micro-frontends.html#Run-timeIntegrationViaWebComponents) integration. Since we're using the same UI framework, we don't have interoperability constraints in contrast to a polyglot framework context. Consequently, web component integration is not necessary: we'll go with a script integration through Webpack and its module federation plugin.
- [Run-time composition with polyglot frameworks](./run-time-polyglot): Same composition approach as the previous one but with a render shim on top of each polyglot micro frontend to guarantee interoperability between them. The interoperability layer could be implemented through a web component wrapper or a custom interface (for example, via single-spa router framework or via a custom function to abstract specific mounting operation for each micro frontend).
- [Server-side composition](./serverside): In contrast to runtime like composition techniques, server side composition allows to assemble the markup of different micro frontends in the served page server side. It allows to achieve incredibly good first-page load speeds that are hard to match using pure client-side integration techniques and can be a requirement for applications with SEO constraints (crawling, indexing...). Please note, that this ingration is not mutually exclusive with runtime ones: server side rendering generally needs a rehydration step client side to attach event listeners and rebuilding the component tree. In this case, a runtime integration should be done as well client side to reconcialiate server rendered fragment during client hydration.


## 📦 Building blocks

- Shell: The shell (or [container/host](https://webpack.js.org/concepts/module-federation/#low-level-concepts)) is the root application orchestrator. It is the main entrypoint scaffolding the application skeleton and allows bootstraping the whole application (eg. registering applications, sharing core libraries...).
- Modules: A module (also called micro frontend or [remote module](https://webpack.js.org/concepts/module-federation/#low-level-concepts)) is a remote vertical consumed by the shell and/or other modules. It can have its own client-side routing and framework/libraries but can also share them with the shell/other modules.
- Shared: Libraries shared across shell and modules. They're key to enable cross-application communication and data management (eg. store, event management...).

## 📕 Resources

- [Overview](https://martinfowler.com/articles/micro-frontends.html)
- [Architecture patterns](https://dev.to/okmttdhr/micro-frontends-architecture-patterns-introduction-3cpk)
- [Micro frontends in action (book)](https://www.manning.com/books/micro-frontends-in-action)
- [Article from the same book author](https://micro-frontends.org/)
- [Module federation (optimization technique for micro frontends to share build-time modules/dependencies)](https://single-spa.js.org/)
- [Single-spa (router/orchestrator for micro frontends to integrate at runtime build-time modules/dependencies without page reloading)](https://single-spa.js.org/)
