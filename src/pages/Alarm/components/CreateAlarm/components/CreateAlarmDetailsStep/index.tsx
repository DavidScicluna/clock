import { FC } from 'react';

import { Divider, Headline, Step, useConst } from '@davidscicluna/component-library';

import { Text, VStack } from '@chakra-ui/react';

import { spacing } from '../../../..';
import steps from '../../common/data/steps';

import { CreateAlarmDetailsStepProps } from './common/types';
import CreateAlarmLabel from './components/CreateAlarmLabel';
import CreateAlarmRepeat from './components/CreateAlarmRepeat';
import CreateAlarmSnooze from './components/CreateAlarmSnooze';

const CreateAlarmDetailsStep: FC<CreateAlarmDetailsStepProps> = (props) => {
	const step = useConst<Step>(steps[1]);

	return (
		<VStack width='100%' divider={<Divider />} spacing={spacing * 2}>
			<Headline
				// renderCaption={}
				renderTitle={(props) => <Text {...props}>{step.title}</Text>}
				renderSubtitle={(props) => <Text {...props}>{step.subtitle}</Text>}
			/>

			<CreateAlarmLabel {...props} />

			<CreateAlarmRepeat {...props} />

			<CreateAlarmSnooze {...props} />
		</VStack>
	);
};

export default CreateAlarmDetailsStep;
