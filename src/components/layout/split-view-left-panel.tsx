import React, { createRef, useEffect } from 'react';

interface LeftPanelProps {
	leftWidth: number | undefined;
	setLeftWidth: (value: number) => void;
	children: React.ReactNode;
}

export default function LeftPanel({
	children,
	leftWidth,
	setLeftWidth,
}: LeftPanelProps) {
	const leftRef = createRef<HTMLDivElement>();

	useEffect(() => {
		if (leftRef.current) {
			if (!leftWidth) {
				setLeftWidth(leftRef.current?.clientWidth);
				return;
			}

			leftRef.current.style.width = `${leftWidth}px`;
		}
	}, [leftRef, leftWidth, setLeftWidth]);
	return <div ref={leftRef}>{children}</div>;
}
