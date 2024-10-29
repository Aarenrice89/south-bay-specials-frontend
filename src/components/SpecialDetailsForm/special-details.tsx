import React from 'react';
import { Grid } from '@mui/material';

import { getDayNames, getTimeValueSelect } from 'src/services/date-time-utils';
import TextFormField from './text-form-field';
import SelectFormField from './select-form-field';

function SpecialDetailsForm() {
	return (
		<div className="pt-2 px-2 flex-grow rounded-r-md overflow-hidden">
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextFormField
						name="name"
						label="Special Name"
						requiredField
					/>
				</Grid>
				<Grid item xs={12}>
					<TextFormField
						name="description"
						label="Description"
						requiredField
						componentProps={{ multiline: true, rows: 3 }}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextFormField
						name="limitations"
						label="Limitations"
						requiredField={false}
					/>
				</Grid>
				<Grid item xs={12}>
					<SelectFormField
						name="dayOfWeek"
						label="Day"
						requiredField
						dataset={getDayNames()}
					/>
				</Grid>
				<Grid item xs={6}>
					<SelectFormField
						name="startTime"
						label="Start Time"
						requiredField={false}
						dataset={getTimeValueSelect()}
					/>
				</Grid>
				<Grid item xs={6}>
					<SelectFormField
						name="endTime"
						label="End Time"
						requiredField={false}
						dataset={getTimeValueSelect()}
					/>
				</Grid>
			</Grid>
		</div>
	);
}

export default SpecialDetailsForm;
