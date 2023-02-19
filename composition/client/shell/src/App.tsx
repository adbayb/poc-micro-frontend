import { Suspense, version } from "react";
//@ts-expect-error @todo: provides type
import { AbsenceView } from "absence/View";
//@ts-expect-error @todo: provides type
import { ExpenseView } from "expense/View";
import { useSharedContext } from "@composition-client/shared-context";

export const App = () => {
	const context = useSharedContext();

	return (
		<main>
			<h1>Shell</h1>
			<p>
				Shared value = {context.value}. React version = {version}
			</p>
			<Suspense fallback="Loading modules...">
				<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
					<AbsenceView />
					<ExpenseView />
				</div>
			</Suspense>
		</main>
	);
};
