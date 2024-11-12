import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

interface Props {
	icon: React.ReactNode;
	title: string;
	url?: string | null;
	className?: string;
}

export default function ListLocationDetail({
	icon,
	title,
	url = null,
	className = '',
}: Props) {
	const { palette } = useTheme();
	return (
		<div>
			{url ? (
				<a href={url} target="_blank" rel="noopener noreferrer">
					<Box className="flex flex-row items-center space-x-2">
						{icon}
						<Typography
							fontWeight="light"
							color={palette.text.primary}
							className={`hover:text-blue-600 ${className ?? ''}`}
						>
							{title}
						</Typography>
					</Box>
				</a>
			) : (
				<Box className="flex flex-row items-center space-x-2">
					{icon}
					<Typography
						fontWeight="light"
						color={palette.text.primary}
						className={className ?? ''}
					>
						{title}
					</Typography>
				</Box>
			)}
		</div>
	);
}
