# poc-module-federation

## Motivation

Multiple separate builds should form a single application. These separate builds should not have dependencies between each other, so they can be developed and deployed individually.
This is often known as Micro-Frontends, but is not limited to that.

## Objectives

- Independent deployments
- Smooth interaction between apps (it should feel like a SPA)
- Enable shared state and client cache across apps
- Make it easier to work on a specific part of the application (disregarding the rest)
- Reducing the size of the project you need to run locally
- Easy code sharing between micro frontends
- Technology agnostic

## Structure

- [./shell]: The app shell is the minimal HTML, CSS and JavaScript required to power the user interface (webpack dependent)
- [./modules/*]: A module is a remote vertical consumable by the shell (webpack dependent)
- [./libraries/*]: Libraries shared between shell and verticals (webpack independent)
