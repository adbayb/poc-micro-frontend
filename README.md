# poc-module-federation

This POC aims to test a micro-frontend design approach with the [Webpack module federation building block](https://webpack.js.org/concepts/module-federation/).

## Motivation

Multiple separate builds should form a single application. These separate builds should not have dependencies between each other, so they can be developed and deployed individually.
This is often known as Micro-Frontends, but is not limited to that.

## Objectives

-   Independent deployments
-   Smooth interaction between apps (it should feel like a SPA)
-   Enable shared state and client cache across apps
-   Make it easier to work on a specific part of the application (disregarding the rest)
-   Reducing the size of the project you need to run locally
-   Easy code sharing between micro frontends
-   Technology agnostic

## Structure

-   [./shell/\*](./shell): The app shell is the minimal HTML, CSS and JavaScript required to power the user interface (webpack dependent). It's the main entrypoint scaffolding the application skeleton. The [Webpack documentation](https://webpack.js.org/concepts/module-federation/#low-level-concepts) references it as the container / "local module".
-   [./modules/\*](./modules): A module is a remote vertical consumed by the shell (webpack dependent). The [Webpack documentation](https://webpack.js.org/concepts/module-federation/#low-level-concepts) references it as a "remote module". A remote module can also, in the same way as the shell, consumer other remote modules.
-   [./shared/\*](./shared): Libraries shared across shell and verticals (webpack independent).
