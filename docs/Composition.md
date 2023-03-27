<div align="center">
    <h2>👨‍🍳 Composition patterns</h2>
    <strong>How to compose micro frontends into a greater whole?</strong>
</div>
<br>
<br>

Once each micro-frontend boundaries have been defined, the next challenge is to compose them together. There's a natural architecture that arises across all composition approaches: usually, there is a container application (shell) that renders common page elements, addresses cross-cutting concerns, and brings many micro frontends together on a page while informing the micro frontend where and when to render itself. 

Let's take a look at different micro frontend architecture composition techniques that can be used:

### Build-time (or compile-time) composition

It consists of publishing each micro frontend as a package, and having the shell includes them all as library dependencies. It produces a single deployable Javascript bundle, as is usual, allowing us to de-duplicate common dependencies from our various applications. However, this approach means that we have to re-compile and release every single micro frontend in order to release a change to any individual part of the product. Just as with microservices, we've seen enough pain caused by such a lockstep release process that we would recommend strongly against this kind of approach to micro frontends. We should find a way to integrate our micro frontends at runtime (either client-side and/or server-side), rather than at build-time.

**How to implement it?**

To manage shared dependencies (ie. `react`, `react-dom` and `@shared/context`) and avoid duplicating them, a `peerDependencies` strategy is used for each module. They're defined as dependencies in the application shell.  
Each micro frontend module is published as a package and the shell includes them all as library dependencies. It produces a single deployable Javascript bundle allowing us to de-duplicate common dependencies.

However, this approach means that we have to re-compile and release every single micro frontend to release a change to any individual part of the product.  
Besides, no sandbox has been configured to run each module in a standalone mode: it's another advantage of the micro frontend approach with module federation (it's supported built-in without any extra configuration).

### Client-side composition

Integrates micro frontends client-side (ie. composing micro applications together in the browser). For this, several techniques could be used to implement it such as [iframes](https://martinfowler.com/articles/micro-frontends.html#Run-timeIntegrationViaIframes), [functions](https://martinfowler.com/articles/micro-frontends.html#Run-timeIntegrationViaJavascript) (including [module federation](https://module-federation.github.io/)), or [web component interfaces](https://martinfowler.com/articles/micro-frontends.html#Run-timeIntegrationViaWebComponents).

**How to implement it? (With federated modules)**

<img alt="Micro frontend architectural diagram" src="https://user-images.githubusercontent.com/10498826/143263059-466a5261-aa7a-4ebb-b02c-e31db661f46e.png">

Shared dependencies and micro frontends are loaded and federated thanks to [the module federation solution](https://module-federation.github.io/). The Webpack plugin `ModuleFederationPlugin` is used to configure federated module builds and their loading strategy at runtime.
All main available options are listed [here](https://github.com/webpack/webpack/blob/1c9b1b7a2136d4d9a27352fdbdf389490cca6460/types.d.ts#L6412) and documented [here](https://webpack.js.org/plugins/module-federation-plugin).

You can find the configuration for the shell [here](shell/webpack.config.js) and one MFE [here](modules/absence/webpack.config.js).  

Some resources about module federation:
- [Module federation official website](https://module-federation.github.io/)
- [Webpack documentation](https://webpack.js.org/concepts/module-federation)
- [Getting out of version-mismatch-hell with module federation](https://www.angulararchitects.io/en/aktuelles/getting-out-of-version-mismatch-hell-with-module-federation/)
- [Interesting approach to manage resilient module federation integration with buildtime fallback](https://www.youtube.com/watch?app=desktop&v=K-yQB9YGmgE)

### Server-side composition

In contrast to client-side like composition techniques, server side composition allows to assemble the markup of different micro frontends in the served page server side. It allows to achieve incredibly good first-page load speeds that are hard to match using pure client-side integration techniques and can be a requirement for applications with SEO constraints (crawling, indexing...). Please note, that this ingration is not mutually exclusive with client-side ones: server side rendering generally needs a rehydration step client side to attach event listeners and rebuilding the component tree. In this case, a client-side integration should be done as well to reconcialiate server rendered fragment during client hydration.