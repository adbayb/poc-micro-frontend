import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Shell } from "./Shell";

const rootElement = document.getElementById("root");

if (rootElement) {
	const root = createRoot(rootElement);

	root.render(
		<StrictMode>
			<Shell />
		</StrictMode>
	);
}
