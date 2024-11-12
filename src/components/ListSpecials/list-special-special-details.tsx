import React, { useState, useEffect, useRef } from 'react';
import { Divider, Box, Typography } from '@mui/material';
import useSplitPanelContext from 'hooks/use-split-panel';

export default function ListSpecialDetail({
	title,
	description,
	limitations,
}: {
	title: string;
	description: string;
	limitations: string;
}) {
	const { isMultiColumn } = useSplitPanelContext();
	const [isOverflowing, setIsOverflowing] = useState(false);
	const descriptionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (descriptionRef.current) {
			const { textContent } = descriptionRef.current;
			setIsOverflowing(textContent !== null && textContent.length > 145);
		}
	}, [description]);

	return (
		<Box className="flex flex-row items-start space-x-4 p-2 relative">
			<Divider
				className="self-stretch min-h-full my-10 rounded-md bg-teal-400"
				orientation="vertical"
				flexItem
				sx={{ borderRightWidth: 3 }}
			/>
			<Box className="flex flex-col space-y-2">
				<Typography variant="h6" className="font-bold">
					{title}
				</Typography>
				<Box ref={descriptionRef}>
					<Typography
						variant="body1"
						className={`${isMultiColumn ? 'line-clamp-2' : ''} transition-all duration-200`}
					>
						{description}
					</Typography>
					{isMultiColumn && isOverflowing && (
						<Box className="absolute top-0 left-0 size-full bg-white p-2 shadow-lg rounded-md opacity-0 hover:opacity-100 transition-opacity duration-200 z-10">
							<Typography variant="body1">
								{description}
							</Typography>
						</Box>
					)}
				</Box>
				<Typography variant="body2" color="textSecondary">
					{limitations}
				</Typography>
			</Box>
		</Box>
	);
}
