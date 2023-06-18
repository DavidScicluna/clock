import { FC } from 'react';

import { Divider, Headline, Step, useConst } from '@davidscicluna/component-library';

import { Text, VStack } from '@chakra-ui/react';

import steps from '../../common/data/steps';

import { CreateAlarmDetailsStepProps } from './common/types';
import CreateAlarmLabel from './components/CreateAlarmLabel';
import CreateAlarmRepeat from './components/CreateAlarmRepeat';
import CreateAlarmSnooze from './components/CreateAlarmSnooze';
import { useSpacing } from '../../../../../../common/hooks';

const CreateAlarmDetailsStep: FC<CreateAlarmDetailsStepProps> = (props) => {
	const step = useConst<Step>(steps[1]);

	const spacing = useSpacing();

	return (
		<VStack width='100%' divider={<Divider />} spacing={spacing}>
			<Headline
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
