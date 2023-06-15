import { FC } from 'react';

import { Divider, Headline } from '@davidscicluna/component-library';

import { Text, VStack } from '@chakra-ui/react';

import { spacing } from '../../../..';

import { EditAlarmDetailsTabProps } from './common/types';
import EditAlarmLabel from './components/EditAlarmLabel';
import EditAlarmRepeat from './components/EditAlarmRepeat';
import EditAlarmSnooze from './components/EditAlarmSnooze';

const EditAlarmDetailsTab: FC<EditAlarmDetailsTabProps> = (props) => {
	return (
		<VStack width='100%' divider={<Divider />} spacing={spacing * 2}>
			<Headline
				// renderCaption={}
				renderTitle={(props) => <Text {...props}>Details</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						Pick a descriptive label for the alert, select the days of the week you wish the alert to repeat
						& also toggle if the alert can be snoozed.
					</Text>
				)}
			/>

			<EditAlarmLabel {...props} />

			<EditAlarmRepeat {...props} />

			<EditAlarmSnooze {...props} />
		</VStack>
	);
};

export default EditAlarmDetailsTab;
