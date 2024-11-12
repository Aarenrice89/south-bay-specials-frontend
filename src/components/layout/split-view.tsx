/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { createRef, useState, useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import { DragHandle } from '@mui/icons-material';
import useSplitPanelContext from 'hooks/use-split-panel';
import LeftPanel from './split-view-left-panel';

interface SplitViewProps {
	left: React.ReactElement;
	right: React.ReactElement;
	className?: string;
}

const MIN_WIDTH = 500;

export default function SplitView({
	left,
	right,
	className = '',
}: SplitViewProps) {
	const { leftWidth, setLeftWidth } = useSplitPanelContext();

	const [separatorXPosition, setSeparatorXPosition] = useState<
		undefined | number
	>(undefined);
	const [dragging, setDragging] = useState(false);
	const splitPaneRef = createRef<HTMLDivElement>();

	const onMouseDown = (e: React.MouseEvent) => {
		setSeparatorXPosition(e.clientX);
		setDragging(true);
	};

	const onTouchStart = (e: React.TouchEvent) => {
		setSeparatorXPosition(e.touches[0].clientX);
		setDragging(true);
	};

	const onMove = (clientX: number) => {
		if (dragging && leftWidth && separatorXPosition) {
			const newLeftWidth = leftWidth + clientX - separatorXPosition;
			setSeparatorXPosition(clientX);

			if (newLeftWidth < MIN_WIDTH) {
				setLeftWidth(MIN_WIDTH);
				return;
			}

			if (splitPaneRef.current) {
				const splitPaneWidth = splitPaneRef.current.clientWidth;

				if (newLeftWidth > splitPaneWidth - MIN_WIDTH) {
					setLeftWidth(splitPaneWidth - MIN_WIDTH);
					return;
				}
			}

			setLeftWidth(newLeftWidth);
		}
	};

	const onMouseMove = (e: MouseEvent) => {
		if (dragging) e.preventDefault();
		onMove(e.clientX);
	};

	const onTouchMove = (e: TouchEvent) => {
		onMove(e.touches[0].clientX);
	};

	const onMouseUp = () => {
		setSeparatorXPosition(undefined);
		setDragging(false);
	};

	useEffect(() => {
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('touchmove', onTouchMove);
		document.addEventListener('mouseup', onMouseUp);

		return () => {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('touchmove', onTouchMove);
			document.removeEventListener('mouseup', onMouseUp);
		};
	});

	return (
		<Box
			ref={splitPaneRef}
			className={`body flex flex-row items-start ${className ?? ''}`}
		>
			<LeftPanel leftWidth={leftWidth} setLeftWidth={setLeftWidth}>
				{left}
			</LeftPanel>
			<Divider
				className="cursor-col-resize self-stretch items-center px-1 min-h-full"
				onMouseDown={onMouseDown}
				onTouchStart={onTouchStart}
				onTouchEnd={onMouseUp}
				orientation="vertical"
				variant="middle"
				flexItem
			>
				<DragHandle color="disabled" className="rotate-90" />
			</Divider>
			<div className="flex-1">{right}</div>
		</Box>
	);
}
