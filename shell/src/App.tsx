import React from "react";
//@ts-expect-error
import AbsenceView from "absence/View";
//@ts-expect-error
import ExpenseView from "expense/View";
import { useSharedContext } from "@shared/context";

const App = () => {
	const context = useSharedContext();

	return (
		<main>
			<h1>Shell</h1>
			<p>Shared value = {context.value}</p>
			<React.Suspense fallback="Loading modules...">
				<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
					<AbsenceView />
					<ExpenseView />
				</div>
			</React.Suspense>
		</main>
	);
};

export default App;
