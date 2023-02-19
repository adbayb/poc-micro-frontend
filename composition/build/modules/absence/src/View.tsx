import { useSharedContext } from "@composition-build/shared-context";

export const Absence = () => {
	const context = useSharedContext();

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#FFEED1",
				borderRadius: 4,
				maxWidth: 500,
				flexGrow: 1,
				padding: 16,
			}}
		>
			<p>Hello from Absence module</p>
			<button onClick={() => context.increment()}>
				Increment shared value ({context.value})
			</button>
		</div>
	);
};
