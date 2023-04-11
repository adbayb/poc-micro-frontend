import { Suspense } from "react";
//@ts-expect-error @todo: provides type
import { App as ExpenseApp } from "classifieds/all";
import { ChakraProvider } from "@foundation/design-system";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Layout } from "./components/Layout";

export const Shell = () => {
	return (
		<ChakraProvider>
			<Layout
				headerSlot={
					<Header
						links={[
							{ label: "Home", href: "/" },
							{ label: "Account", href: "/account" },
						]}
					/>
				}
				appSlot={
					// @todo: MicroFrontend loader (for discovery purposes)
					<Suspense fallback="Loading modules...">
						<ExpenseApp />
					</Suspense>
				}
				footerSlot={<Footer />}
			/>
		</ChakraProvider>
	);
};
