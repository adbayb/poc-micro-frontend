import { version } from "react";
import { Box, Text } from "@foundation/design-system";

export const MicroFrontend = () => (
	<Box
		display="flex"
		flexDirection="column"
		alignItems="center"
		justifyContent="center"
		backgroundColor="#b4d5fa"
		borderRadius={4}
		maxWidth={500}
		flexGrow={1}
		padding={16}
	>
		<Text>Hello from Expense module. React version = {version}</Text>
	</Box>
);
