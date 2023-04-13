import { ComponentType, Suspense, lazy } from "react";

export const createMicroFrontend = (load: () => Promise<ComponentType>) => {
	const LazyComponent = lazy(async () => {
		return {
			default: await load(),
		} as const;
	});

	return function MicroFrontend() {
		return (
			<Suspense fallback="Loading...">
				<LazyComponent />
			</Suspense>
		);
	};
};
