<br>
<div align="center">
    <h1>🧪 Micro frontends</h1>
    <strong>Micro-frontend architecture documentation and exploration</strong>
</div>
<br>
<br>

## 🤔 What's the micro-frontend architecture?

To quote [Martin Fowler blog](https://martinfowler.com/articles/micro-frontends.html):
> Micro-frontend architecture can be defined as **an architectural style** where **independently deliverable** frontend applications are **composed into a greater whole**

As such, micro frontend is not a new framework, a technique or even a "thing": it's the manifestation of the software distribution idea in the frontend world. It provides guiding principles to decompose a front-end monolith into smaller applications (micro applications) and enjoy the ability to split the organization the same way (Conway's law). Each micro application can be then **developed**, **tested** and **deployed independently**, while still appearing to customers as a single cohesive product.

Four **principles** should be kept in mind while building micro frontends:
- **Domain-centric**: micro frontends have clear boundaries and ownership modeled around business domains ([subdomains](https://thedomaindrivendesign.io/domains-and-subdomains/)) to enable...
- **Autonomy**: micro frontends enable teams to work independently reducing the communication overhead and the release cycle time. Independent development and deployment are at the heart of the micro-frontend architecture. To make it possible, micro frontends rely on loose coupling (minimize dependency with the outside) and isolation (do not impact the rest of the system (encapsulation and fault isolation))
- **Alignment**: micro frontends are orchestrated properly to form a consistent application whole at the end. In other words, the website should make sure that micro frontends are harmoniously composed
- **Measurement**: observability and monitoring are keys to understanding how a distributed architecture such as the micro-frontend one behaves in production. It's essential to understand when something goes wrong along the application composition and delivery chain so the root cause can be identified and corrected. It's also important to define and monitor a performance budget from the beginning to make sure that local autonomous decisions (eg. different UI framework usage) don't hurt the overall user experience at the end (see the next part "Microservice analogy")

<br>

## 🗓️ When to use it?

Micro frontends are not a silver bullet and are definitively not suitable for all use cases.

There are some turning points: for example, a large organization with several teams working on the same code base where each team wants to work independently to deliver at their own pace. This example is one of the best fits for micro-frontend architecture.
In contrast, micro-frontend architecture is not suitable for small companies where the time commitment arising from the amount of work required makes the micro-frontend approach too much of an investment for the available resources.

It should be used with caution because, as we've seen, it can come with some challenges (performance, payload (bundle size), encapsulation, ...) that should be compared with benefits before deciding if it can a be good approach or not for a specific context.

<br>

## 👨‍🍳 How to implement it?

As usual, it'll depend heavily on the operational context. Let's first start to define the main components involved in the architecture:

*To review (draft)*

- Shell: The shell (or [container/host](https://webpack.js.org/concepts/module-federation/#low-level-concepts)) is the micro-frontend orchestrator component. Its responsibility is to welcome in the best possible conditions each micro frontend. It's a technical component only and must not contain any business logic.
- Micro frontends: Self-contained modules (also [remote module](https://webpack.js.org/concepts/module-federation/#low-level-concepts)) consumed by the shell. It can have its own client-side routing and framework/libraries but can also share them with the shell/other modules.

Implementing the micro frontend architecture comes with different challenges from splitting a monolith to fragment composition or linking experiences together, ... Those challenges can be solved with the help of several recipes that act like a blueprint and are categorized by their intent. These recipes are what we call micro-frontend **patterns** and we've identified, at least, four main classifications that aim to address the implementation (ordered from the micro-frontend journey beginning to the end):

- [Boundary](./boundary)
- [Composition](./composition)
- [Routing](./routing)
- [Communication](./communication)
- [Delivery](./delivery)

<br>

## ℹ️ Appendix

#### Microservice analogy

You might have heard the not-so-truth microservice analogy: "micro frontends are like microservices but in the front-end world".  While both allow complex system decomposition, there're some notable differences tied to the execution context. Indeed, by virtue of running within the browser, micro frontends result in different constraints. With this in mind, tech stack freedom level (eg. multi-framework usage) must be carefully assessed to not impact the user experience and performance at the end.

<br>

## 📕 Resources

#### General
- [Introduction (1/3)](https://martinfowler.com/articles/micro-frontends.html)
- [Introduction (2/3)](https://micro-frontends.org/)
- [Introduction (3/3)](https://increment.com/frontend/micro-frontends-in-context/)
- [Splitting recipes](https://lucamezzalira.com/2019/05/21/identifying-micro-frontends-in-our-applications/)
- [Architectural patterns](https://dev.to/okmttdhr/micro-frontends-architecture-patterns-introduction-3cpk)
- [Anti-patterns](https://www.youtube.com/watch?v=T3NINYCP9gg)

#### Tools & frameworks
- [Module federation (or how to share dependencies and modules in an efficient way)](https://module-federation.github.io/)
- [Single-spa (or how to orchestrate micro frontends)](https://single-spa.js.org/)

#### Others
- [Micro-frontend blog posts from Luca Mezzalira](https://lucamezzalira.com/tag/micro-frontends/)
- [Micro-frontends and the socio-technical aspect](https://techleadjournal.dev/episodes/47/)
- [A look at the micro-frontend architecture trend](https://frontendmastery.com/posts/understanding-micro-frontends/)
- [10 decision points for a micro-frontend approach](https://betterprogramming.pub/10-decision-points-for-micro-frontends-approach-4ebb4b59f40)
- [Micro Frontend Architecture: The newest approach To building scalable frontend](https://www.simform.com/blog/micro-frontend-architecture/)
