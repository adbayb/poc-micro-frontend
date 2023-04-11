import { Suspense } from "react";
//@ts-expect-error @todo: provides type
import { MicroFrontend as ExpenseMicroFrontend } from "expense/all";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Layout } from "./components/Layout";

export const Shell = () => {
	return (
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
				<Suspense fallback="Loading modules...">
					<ExpenseMicroFrontend />
				</Suspense>
			}
			footerSlot={<Footer />}
		/>
	);
};
