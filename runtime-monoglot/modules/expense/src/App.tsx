import { SharedProvider } from "@shared/context";
import { StrictMode } from "react";
import { ExpenseView } from "./View";

export const App = () => (
	<StrictMode>
		<SharedProvider>
			<ExpenseView />
		</SharedProvider>
	</StrictMode>
);
