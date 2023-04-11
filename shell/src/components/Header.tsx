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
			height={100}
			backgroundColor="white"
			alignItems="center"
			boxShadow="0 0 5px 3px rgba(0,0,0,0.2)"
			gap={8}
			padding={36}
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
