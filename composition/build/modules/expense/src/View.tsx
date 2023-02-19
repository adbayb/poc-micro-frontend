import { useSharedContext } from "@composition-build/shared-context";

export const Expense = () => {
	const context = useSharedContext();

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#B4D5FA",
				borderRadius: 4,
				maxWidth: 500,
				flexGrow: 1,
				padding: 16,
			}}
		>
			<p>Hello from Expense module</p>
			<button onClick={() => context.decrement()}>
				Decrement shared value ({context.value})
			</button>
		</div>
	);
};
