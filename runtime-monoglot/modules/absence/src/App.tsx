import { SharedProvider } from "@shared/context";
import { StrictMode } from "react";
import { AbsenceView } from "./View";

export const App = () => (
	<StrictMode>
		<SharedProvider>
			<AbsenceView />
		</SharedProvider>
	</StrictMode>
);
