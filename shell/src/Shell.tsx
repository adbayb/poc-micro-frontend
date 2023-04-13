import { ChakraProvider } from "@foundation/design-system";
import { Route, BrowserRouter as Router, Routes } from "@foundation/router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Layout } from "./components/Layout";
import { createMicroFrontend } from "./components/MicroFrontend";

const ExpenseApp = createMicroFrontend(async () => {
	//@ts-expect-error @todo: provides types
	return (await import("classifieds/all")).App;
});

const Account = () => {
	return <>Account</>;
};

export const Shell = () => {
	return (
		<ChakraProvider>
			<Router>
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
						<Routes>
							<Route
								index
								element={<ExpenseApp />}
							/>
							<Route
								path="/account/*"
								element={<Account />}
							/>
						</Routes>
					}
					footerSlot={<Footer />}
				/>
			</Router>
		</ChakraProvider>
	);
};
