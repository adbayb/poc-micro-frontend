import React from "react";
import { Absence } from "module-absence";
import { Expense } from "module-expense";
import { useSharedContext } from "@shared/context";

const App = () => {
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

export default App;
