import { Box } from "@foundation/design-system";
import { ReactElement } from "react";

interface LayoutProps {
	headerSlot?: ReactElement;
	footerSlot?: ReactElement;
	appSlot?: ReactElement;
}

export const Layout = ({ headerSlot, footerSlot, appSlot }: LayoutProps) => {
	return (
		<Box
			display="flex"
			width="100%"
			flexDirection="column"
			height={900}
			minHeight="100%"
		>
			<Box>{headerSlot}</Box>
			<Box
				as="main"
				marginBlock={16}
				display="flex"
				justifyContent="center"
				alignItems="center"
				flexGrow={1}
			>
				{appSlot}
			</Box>
			<Box marginTop="auto">{footerSlot}</Box>
		</Box>
	);
};
