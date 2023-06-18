import { FC } from 'react';

import { Divider, Headline } from '@davidscicluna/component-library';

import { Text, VStack } from '@chakra-ui/react';

import { EditAlarmDetailsTabProps } from './common/types';
import EditAlarmLabel from './components/EditAlarmLabel';
import EditAlarmRepeat from './components/EditAlarmRepeat';
import EditAlarmSnooze from './components/EditAlarmSnooze';
import useSpacing from '../../../../../../common/hooks/useSpacing';

const EditAlarmDetailsTab: FC<EditAlarmDetailsTabProps> = (props) => {
	const spacing = useSpacing();

	return (
		<VStack width='100%' divider={<Divider />} spacing={spacing}>
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
