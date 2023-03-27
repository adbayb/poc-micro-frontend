import { Suspense, version } from "react";
//@ts-expect-error @todo: provides type
import { AbsenceView } from "absence/View";
//@ts-expect-error @todo: provides type
import { ExpenseView } from "expense/View";
import { Box, Text } from "@foundation/design-system";

export const App = () => {
	return (
		<Box as="main">
			<Box as="h1">Shell</Box>
			<Text>React version = {version}</Text>
			<Suspense fallback="Loading modules...">
				<Box
					display="flex"
					gap={16}
					flexWrap="wrap"
				>
					<AbsenceView />
					<ExpenseView />
				</Box>
			</Suspense>
		</Box>
	);
};
