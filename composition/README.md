<div align="center">
    <h2>👨‍🍳 Composition patterns</h2>
    <strong>How to compose micro frontends into a greater whole?</strong>
</div>
<br>
<br>

Once each micro-frontend boundaries have been defined, the next challenge is to compose them together. There's a natural architecture that arises across all composition approaches: usually, there is a container application (shell) that renders common page elements, addresses cross-cutting concerns, and brings many micro frontends together on a page while informing the micro frontend where and when to render itself. 

Let's take a look at different micro frontend architecture composition techniques that can be used:

### [Build-time (or compile-time) composition](./build)

It consists of publishing each micro frontend as a package, and having the shell includes them all as library dependencies. It produces a single deployable Javascript bundle, as is usual, allowing us to de-duplicate common dependencies from our various applications. However, this approach means that we have to re-compile and release every single micro frontend in order to release a change to any individual part of the product. Just as with microservices, we've seen enough pain caused by such a lockstep release process that we would recommend strongly against this kind of approach to micro frontends. We should find a way to integrate our micro frontends at runtime (either client-side and/or server-side), rather than at build-time.

### [Client-side composition](./client)

Integrates micro frontends client-side (ie. composing micro applications together in the browser). For this, several techniques could be used to implement it such as [iframes](https://martinfowler.com/articles/micro-frontends.html#Run-timeIntegrationViaIframes), [functions](https://martinfowler.com/articles/micro-frontends.html#Run-timeIntegrationViaJavascript) (including [module federation](https://module-federation.github.io/)), or [web component interfaces](https://martinfowler.com/articles/micro-frontends.html#Run-timeIntegrationViaWebComponents).

### [Server-side composition](./server)

In contrast to client-side like composition techniques, server side composition allows to assemble the markup of different micro frontends in the served page server side. It allows to achieve incredibly good first-page load speeds that are hard to match using pure client-side integration techniques and can be a requirement for applications with SEO constraints (crawling, indexing...). Please note, that this ingration is not mutually exclusive with client-side ones: server side rendering generally needs a rehydration step client side to attach event listeners and rebuilding the component tree. In this case, a client-side integration should be done as well to reconcialiate server rendered fragment during client hydration.