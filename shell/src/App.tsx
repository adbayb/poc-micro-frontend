import React from "react";
//@ts-ignore
import AbsenceView from "absence/View";
import { useSharedContext } from "@shared/context";

const App = () => {
	const context = useSharedContext();

	return (
		<main>
			<h1>Shell</h1>
			<p>Shared value = {context.value}</p>
			<React.Suspense fallback="Loading modules...">
				<AbsenceView />
			</React.Suspense>
		</main>
	);
};

export default App;
