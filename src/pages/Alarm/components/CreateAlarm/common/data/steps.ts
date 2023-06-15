import { Steps } from '@davidscicluna/component-library';

const steps: Steps = [
	{
		index: 1,
		title: 'Time',
		subtitle:
			'Select the time you wish for when the alarm to trigger. Select the Hour & Minute by increasing/decreasing.',
		status: 'idle'
	},
	{
		index: 2,
		title: 'Details',
		subtitle:
			'Pick a descriptive label for the alert, select the days of the week you wish the alert to repeat & also toggle if the alert can be snoozed.',
		status: 'idle'
	}
];

export default steps;
