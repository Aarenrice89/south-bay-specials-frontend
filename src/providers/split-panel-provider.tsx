import React, {
	createContext,
	type ReactNode,
	useCallback,
	useEffect,
	useState,
	useMemo,
} from 'react';
import { type GroupedSpecialResponse } from 'types';

interface ISplitPanelContext {
	hoverId: string | null;
	setHoverId: React.Dispatch<React.SetStateAction<string | null>>;
	onMouseEnter: (id: string | null) => void;
	onMouseLeave: () => void;
	leftWidth: undefined | number;
	setLeftWidth: React.Dispatch<React.SetStateAction<undefined | number>>;
	isMultiColumn: boolean;
	specialData: GroupedSpecialResponse[];
	setSpecialData: React.Dispatch<
		React.SetStateAction<GroupedSpecialResponse[]>
	>;
}

const initialContext: ISplitPanelContext = {
	hoverId: null,
	setHoverId: () => undefined,
	onMouseEnter: () => undefined,
	onMouseLeave: () => undefined,
	leftWidth: undefined,
	setLeftWidth: () => undefined,
	isMultiColumn: false,
	specialData: [],
	setSpecialData: () => undefined,
};

const MIN_WIDTH = 500;
// const SPECIAL_MIN_W = 500;
const SPECIAL_MAX_W = 600;

function startWidth(vh: { vh: number }): number {
	const width = (window.innerWidth * vh.vh) / 100;
	return width < MIN_WIDTH ? MIN_WIDTH : width;
}

export const SplitPanelContext =
	createContext<ISplitPanelContext>(initialContext);

export default function SplitPanelProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [hoverId, setHoverId] = useState<string | null>(null);

	const onMouseEnter = useCallback((id: string | null) => setHoverId(id), []);
	const onMouseLeave = useCallback(() => setHoverId(null), []);
	const [leftWidth, setLeftWidth] = useState<undefined | number>(
		startWidth({ vh: 50 }),
	);
	const [isMultiColumn, setIsMultiColumn] = useState<boolean>(false);
	const [specialData, setSpecialData] = useState<GroupedSpecialResponse[]>(
		[],
	);

	useEffect(() => {
		const checkMultiColumn = () => {
			if (leftWidth) {
				setIsMultiColumn(leftWidth > SPECIAL_MAX_W * 2 + 64);
			}
		};

		checkMultiColumn();
		window.addEventListener('resize', checkMultiColumn);
		return () => {
			window.removeEventListener('resize', checkMultiColumn);
		};
	}, [leftWidth]);

	const splitPanelContext: ISplitPanelContext = useMemo(() => {
		return {
			hoverId,
			setHoverId,
			onMouseEnter,
			onMouseLeave,
			leftWidth,
			setLeftWidth,
			isMultiColumn,
			specialData,
			setSpecialData,
		};
	}, [
		hoverId,
		setHoverId,
		onMouseEnter,
		onMouseLeave,
		leftWidth,
		setLeftWidth,
		isMultiColumn,
		specialData,
		setSpecialData,
	]);

	return (
		<SplitPanelContext.Provider value={splitPanelContext}>
			{children}
		</SplitPanelContext.Provider>
	);
}
