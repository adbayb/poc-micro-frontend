import React from "react";
import { Absence } from "@composition-build/micro-frontend-absence";
import { Expense } from "@composition-build/micro-frontend-expense";
import { useSharedContext } from "@composition-build/shared-context";

export const App = () => {
	const context = useSharedContext();

	return (
		<main>
			<h1>Shell</h1>
			<p>Shared value = {context.value}</p>
			<React.Suspense fallback="Loading modules...">
				<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
					<Absence />
					<Expense />
				</div>
			</React.Suspense>
		</main>
	);
};
