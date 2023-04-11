import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { MicroFrontend } from "./MicroFrontend";

const rootElement = document.getElementById("root");

if (rootElement) {
	const root = createRoot(rootElement);

	root.render(
		<StrictMode>
			<MicroFrontend />
		</StrictMode>
	);
}
