import { version } from "react";
import { useSharedContext } from "@composition-client/shared-context";

export const AbsenceView = () => {
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
			<p>Hello from Absence module. React version = {version}</p>
			<button onClick={() => context.increment()}>
				Increment shared value ({context.value})
			</button>
		</div>
	);
};
