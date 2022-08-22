<br>
<div align="center">
    <h1>🧪 Micro frontends</h1>
    <strong>Micro-frontend architecture exploration</strong>
</div>
<br>
<br>

## 🤔 Motivation

This repository aims to experiment and document several techniques to implement a micro-frontend architecture.

But before... what's the micro-frontend architecture?

To quote [Martin Fowler blog](https://martinfowler.com/articles/micro-frontends.html):
> Micro-frontend architecture can be defined as **an architectural style** where **independently deliverable** frontend applications are **composed into a greater whole**

It provides guiding principles to decompose a front-end monolith into smaller applications (micro applications) that can be **developed**, **tested** and **deployed independently**, while still appearing to customers as a single cohesive product.

At least, three principles should be kept in mind while building micro frontends:
- **Boundary**: micro frontends have clear boundaries modeled around business domains with clear ownership to enable...
- **Autonomy**: micro frontends are as autonomous as possible within their own boundaries to enable independent development and deployment. For that purpose, micro frontends must be loosely coupled (interact with each other only via a contract (API)) and isolated (do not impact the rest of the system (encapsulation and fault isolation))
- **Alignment**: micro frontends are orchestrated properly. The website must provide a consistent user experience by making sure that micro frontends are harmoniously composed to become a consistent whole at the end

*Please note that you'll often hear the not-so-truth microservice analogy: while both allow decoupled and independent codebases, there're some notable differences tied to the execution context. Indeed, by virtue of running within the browser, micro frontends result in different constraints. With this in mind, tech stack freedom level (eg. multi-framework usage) must be carefully assessed to not impact the user experience with a bloated application at the end.*

## 🧪 Patterns

Integration (or composition) between the container (aka shell here) and the micro frontends (aka modules here) is one of the main challenge. There's a natural architecture that arises across all the approaches: usually, there is a container application that renders common page elements, addresses cross-cutting concerns, and brings many micro frontends together on a page while informing the micro frontend where and when to render itself. 

Let's take a look at different micro frontend architecture composition techniques that can be used:

- [Build-time (or compile-time) composition](./buildtime): It consists of publishing each micro frontend as a package, and having the shell includes them all as library dependencies. It produces a single deployable Javascript bundle, as is usual, allowing us to de-duplicate common dependencies from our various applications. However, this approach means that we have to re-compile and release every single micro frontend in order to release a change to any individual part of the product. Just as with microservices, we've seen enough pain caused by such a lockstep release process that we would recommend strongly against this kind of approach to micro frontends. We should find a way to integrate our micro frontends at runtime, rather than at build-time.
- [Run-time composition](./runtime): Integrates micro frontends at runtime (ie. composing micro applications together in the browser). For this, several techniques could be used to implement it such as [iframes](https://martinfowler.com/articles/micro-frontends.html#Run-timeIntegrationViaIframes), [functions](https://martinfowler.com/articles/micro-frontends.html#Run-timeIntegrationViaJavascript), or [web component interfaces](https://martinfowler.com/articles/micro-frontends.html#Run-timeIntegrationViaWebComponents).
- [Server-side composition](./serverside): In contrast to runtime like composition techniques, server side composition allows to assemble the markup of different micro frontends in the served page server side. It allows to achieve incredibly good first-page load speeds that are hard to match using pure client-side integration techniques and can be a requirement for applications with SEO constraints (crawling, indexing...). Please note, that this ingration is not mutually exclusive with runtime ones: server side rendering generally needs a rehydration step client side to attach event listeners and rebuilding the component tree. In this case, a runtime integration should be done as well client side to reconcialiate server rendered fragment during client hydration.

TODO:
- Linked application (MPA?)
- Unified SPA
+ Pros/cons for each one


## 📦 Building blocks

- Shell: The shell (or [container/host](https://webpack.js.org/concepts/module-federation/#low-level-concepts)) is the root application orchestrator. It is the main entrypoint scaffolding the application skeleton and allows bootstraping the whole application (eg. registering applications, sharing core libraries...).
- Modules: A module (also called micro frontend or [remote module](https://webpack.js.org/concepts/module-federation/#low-level-concepts)) is a remote vertical consumed by the shell and/or other modules. It can have its own client-side routing and framework/libraries but can also share them with the shell/other modules.
- Shared: Libraries shared across shell and modules. They're key to enable cross-application communication and data management (eg. store, event management...).

## 📕 Resources

#### General
- [Introduction (1/2)](https://martinfowler.com/articles/micro-frontends.html)
- [Introduction (2/2)](https://micro-frontends.org/)
- [Architectural patterns](https://dev.to/okmttdhr/micro-frontends-architecture-patterns-introduction-3cpk)
- [Anti-patterns](https://www.youtube.com/watch?v=T3NINYCP9gg)

#### Tools & frameworks
- [Module federation (or how to share dependencies and modules in an efficient way)](https://module-federation.github.io/)
- [Single-spa (or how to orchestrate micro frontends)](https://single-spa.js.org/)

#### Others
- [Micro-frontend blog posts from Luca Mezzalira](https://lucamezzalira.com/tag/micro-frontends/)
- [A look at the micro-frontend architecture trend](https://frontendmastery.com/posts/understanding-micro-frontends/)
- [10 decision points for a micro-frontend approach](https://betterprogramming.pub/10-decision-points-for-micro-frontends-approach-4ebb4b59f40)
- [Micro Frontend Architecture: The newest approach To building scalable frontend](https://www.simform.com/blog/micro-frontend-architecture/)
