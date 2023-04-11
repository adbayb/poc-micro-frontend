import { Box } from "@foundation/design-system";

export const Footer = () => {
	return (
		<Box
			as="footer"
			display="flex"
			width="100%"
			height={100}
			backgroundColor="white"
			alignItems="center"
			justifyContent="center"
			gap={8}
			padding={8}
			marginTop="auto"
		>
			Footer content
		</Box>
	);
};
