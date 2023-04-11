import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ChakraProvider } from "@foundation/design-system";
import { App } from "..";

const rootElement = document.getElementById("root");

if (rootElement) {
	const root = createRoot(rootElement);

	root.render(
		<StrictMode>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</StrictMode>
	);
}
