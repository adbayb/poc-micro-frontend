import { version } from "react";
import {
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Heading,
	Stack,
	Text,
} from "@foundation/design-system";

interface Classified {
	id: number;
	price: number;
	address: string;
	type: "apartment" | "house";
	description: string;
}

const CLASSIFIEDS: Array<Classified> = [...new Array(6)].map((_, index) => {
	return {
		id: index,
		price: 700000,
		address: "7 boulevard Haussmann, 75009 Paris",
		type: "house",
		description: "Lorem ipsum",
	};
});

const ClassifiedCard = ({ price, address, description }: Classified) => {
	return (
		<Card maxW="xs">
			<CardBody>
				<Stack spacing="3">
					<Heading size="md">{address}</Heading>
					<Text>{description}</Text>
					<Text
						color="blue.600"
						fontSize="2xl"
					>
						${price}
					</Text>
				</Stack>
			</CardBody>
			<Divider color="gray.300" />
			<CardFooter>
				<Button
					variant="solid"
					colorScheme="blue"
				>
					Add to favorites
				</Button>
			</CardFooter>
		</Card>
	);
};

export const App = () => (
	<Box
		display="flex"
		flexDirection="column"
		justifyContent="center"
		alignItems="center"
		padding={8}
		gap={16}
	>
		<Text>Hello from Classifieds module. React version = {version}</Text>
		<Box
			display="flex"
			flexWrap="wrap"
			flexDirection="row"
			gap={4}
			justifyContent="center"
		>
			{CLASSIFIEDS.map((classified) => {
				return (
					<ClassifiedCard
						key={classified.id}
						{...classified}
					/>
				);
			})}
		</Box>
	</Box>
);
