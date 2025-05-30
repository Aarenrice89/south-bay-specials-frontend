import React, { useEffect } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { Place, Language, PhoneIphone } from '@mui/icons-material';
import useSplitPanelContext from 'hooks/use-split-panel';
import { getGroupedSpecials } from 'src/services/api/methods';
import ListLocationDetail from './list-special-location-detail';
import ListSpecialDetail from './list-special-special-details';

const SPECIAL_MIN_W = 500;
const SPECIAL_MAX_W = 600;

export default function ListSpecials() {
	const {
		onMouseEnter,
		onMouseLeave,
		isMultiColumn,
		specialData,
		setSpecialData,
	} = useSplitPanelContext();

	useEffect(() => {
		const fetchAllSpecials = () => {
			getGroupedSpecials().then((response) => {
				setSpecialData(response.data);
			});
		};
		fetchAllSpecials();
	}, [setSpecialData]);

	return (
		<Box className="max-h-[calc(100vh-80px)] overflow-y-auto flex flex-wrap scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100">
			{specialData.map((location) => (
				<Box
					key={location.location.googlePlaceId}
					onMouseEnter={() =>
						onMouseEnter(location.location.googlePlaceId)
					}
					onMouseLeave={onMouseLeave}
					className={`p-4 min-w-[${SPECIAL_MIN_W}px] max-w-[${SPECIAL_MAX_W}px] flex flex-col justify-between ${
						isMultiColumn ? '' : ''
					}`}
				>
					<Grid
						container
						spacing={0}
						className={`pb-4 ${isMultiColumn ?? 'min-h-[350px] max-h-[350px] mb-auto'}`}
					>
						<Grid item xs={12}>
							<Typography variant="h5" className="text-teal-900">
								{location.location.name}
							</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							className={`${
								isMultiColumn
									? 'max-h-[250px] overflow-hidden mb-auto'
									: ''
							}`}
						>
							{location.specials.map((special) => (
								<ListSpecialDetail
									title={special.name ?? ''}
									description={special.description}
									limitations={special.limitations ?? ''}
									key={`${location.location.googlePlaceId}-${special.name}`}
								/>
							))}
						</Grid>
						<Box className="mt-auto">
							<Grid item xs={12}>
								{location.location.address ? (
									<ListLocationDetail
										title={location.location.address}
										icon={
											<Place
												sx={{
													stroke: '#ffffff',
													strokeWidth: 1,
												}}
												className="text-teal-400"
											/>
										}
										url={location.location.googleUrl}
									/>
								) : null}
							</Grid>
							<Grid item xs={12}>
								<div className="flex flex-row space-x-4">
									{location.location.phoneNumber ? (
										<ListLocationDetail
											className="whitespace-nowrap"
											title={
												location.location.phoneNumber
											}
											icon={
												<PhoneIphone
													sx={{
														stroke: '#ffffff',
														strokeWidth: 1,
													}}
													className="text-teal-400"
												/>
											}
										/>
									) : null}
									{location.location.website ? (
										<ListLocationDetail
											title={location.location.website}
											icon={
												<Language
													sx={{
														stroke: '#ffffff',
														strokeWidth: 1,
													}}
													className="text-teal-400"
												/>
											}
											url={location.location.website}
										/>
									) : null}
								</div>
							</Grid>
						</Box>
					</Grid>
					<Divider
						className="rounded-md bg-gray-200"
						sx={{ borderBottomWidth: 2 }}
					/>
				</Box>
			))}
		</Box>
	);
}
