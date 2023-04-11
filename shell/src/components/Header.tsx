import { Box, Link, Text } from "@foundation/design-system";
import { version } from "react";

interface HeaderProps {
	links: Array<{ label: string; href: string }>;
}

export const Header = ({ links }: HeaderProps) => {
	return (
		<Box
			as="header"
			display="flex"
			width="100%"
			backgroundColor="white"
			alignItems="center"
			boxShadow="md"
			gap={8}
			padding={8}
			justifyContent="space-between"
		>
			<Box
				display="flex"
				gap={8}
			>
				{links.map(({ href, label }) => {
					return (
						<Link
							key={href}
							href={href}
							fontSize={16}
						>
							{label}
						</Link>
					);
				})}
			</Box>
			<Box>
				<Text>v{version}</Text>
			</Box>
		</Box>
	);
};
