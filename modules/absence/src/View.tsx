import { useSharedContext } from "@shared/context";

const View = () => {
	const context = useSharedContext();

	return (
		<div>
			<p>Hello from Absence module</p>
			<button onClick={() => context.increment()}>
				Increment from absence ({context.value})
			</button>
		</div>
	);
};

export default View;
