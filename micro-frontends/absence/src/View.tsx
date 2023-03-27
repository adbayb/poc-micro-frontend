import { Box, Text } from "@foundation/design-system";
import { version } from "react";

export const AbsenceView = () => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			backgroundColor="#ffeed1"
			borderRadius={4}
			maxWidth={500}
			flexGrow={1}
			padding={16}
		>
			<Text>Hello from Absence module. React version = {version}</Text>
		</Box>
	);
};
