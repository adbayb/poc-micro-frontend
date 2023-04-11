import { Suspense, version } from "react";
//@ts-expect-error @todo: provides type
import { MicroFrontend as ExpenseMicroFrontend } from "expense/all";
import { Box, Text } from "@foundation/design-system";

export const Shell = () => {
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
					<ExpenseMicroFrontend />
				</Box>
			</Suspense>
		</Box>
	);
};
