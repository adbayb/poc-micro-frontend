<div align="center">
    <h2>👨‍🍳 Boundary patterns</h2>
    <strong>How to break a monolithic experience into micro frontends?</strong>
</div>
<br>
<br>

Micro frontends divide the application into slices: each slice is modeled around subdomains, built from end-to-end (ie. spans from the data layer (infrastructure/backend) to the presentation one (frontend)), and run by a dedicated team.
This step, also known as slicing or splitting, allows to identify micro frontends by spotting slices in an existing or future product experience.  

Micro frontends can be defined in two ways: 
- **Vertical slice**: an entire view (or page). Each view is assigned to a team.  
- **Horizontal slice**: small fragment within an entire view (eg. a header, search, listing component, ...). Each fragment can be owned by a different team, and multiple teams are taking care of the view composition coordinating themselves for the final result presented to the end user.

In general, defining micro-frontends with a vertical slicing strategy will simplify many technical challenges to tackle because it's closest to the traditional SPA (Single-Page Application) approach. Indeed: 
- Owning a vertical slice of the application and not multiple parts spread across the application is closer to the way a team is used to working. Many existing techniques can be applied to this approach easing, also, the cross-team coordination (less dependency sharing, less communication overload, less QA complexity, ...).
- It'll enable natural encapsulation (ie. no side effects between micro frontends): eg. no host scope pollution, no logic/style leaking challenges...

Whatever the used approach, the important point is to **identify, first, each subdomain boundaries (bounded context)** to know how to slice an application and isolate micro frontends.