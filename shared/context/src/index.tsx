import {
	ReactElement,
	createContext,
	useContext,
	useMemo,
	useState,
} from "react";

type SharedContextValue = {
	value: number;
	increment: () => void;
	decrement: () => void;
	reset: () => void;
};

const SharedContext = createContext<SharedContextValue>({
	value: 0,
	increment() {},
	decrement() {},
	reset() {},
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
