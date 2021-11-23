import { lazy, Suspense } from "react";

// @ts-expect-error
const RemoteAbsence = lazy(() => import("absence/ModuleEntrypoint"));

export const App = () => (
	<main>
		<h1>Hello world</h1>
        <Suspense fallback="Loading...">
		    <RemoteAbsence />
        </Suspense>
	</main>
);
