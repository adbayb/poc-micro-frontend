import {
	ReactElement,
	createContext,
	useContext,
	useMemo,
	useState,
	version,
} from "react";

console.info(`\`@shared/context\` React version = ${version}`);

type SharedContextValue = {
	value: number;
	increment: () => void;
	decrement: () => void;
	reset: () => void;
};

const standaloneModuleWarning = () =>
	console.warn(
		"Shared context is currently consumed without the app shell. The operation is not allowed in a standalone module."
	);

const SharedContext = createContext<SharedContextValue>({
	value: 0,
	increment: standaloneModuleWarning,
	decrement: standaloneModuleWarning,
	reset: standaloneModuleWarning,
});

type SharedProviderProps = {
	children: ReactElement;
};

export const SharedProvider = ({ children }: SharedProviderProps) => {
	const [value, setValue] = useState(0);
	const contextValue = useMemo(() => {
		return {
			value,
			increment() {
				setValue(value + 1);
			},
			decrement() {
				setValue(value - 1);
			},
			reset() {
				setValue(0);
			},
		};
	}, [value]);

	return (
		<SharedContext.Provider value={contextValue}>
			{children}
		</SharedContext.Provider>
	);
};

export const useSharedContext = () => useContext(SharedContext);
