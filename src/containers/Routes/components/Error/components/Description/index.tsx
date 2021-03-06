import { ReactElement, forwardRef } from 'react';

import { VStack, Text } from '@chakra-ui/react';

import { DescriptionRef } from '../../types';

import { DescriptionProps } from './types';


const Description = forwardRef<DescriptionRef, DescriptionProps>(function Description(props, ref): ReactElement {
	const { colorMode, title, subtitle } = props;

	return (
		<VStack ref={ref} alignItems='flex-start' spacing={0}>
			<Text align='left' color={`gray.${colorMode === 'light' ? 900 : 50}`} fontSize='4xl' fontWeight='bold'>
				{title}
			</Text>
			<Text align='left' color={`gray.${colorMode === 'light' ? 400 : 500}`} fontSize='md'>
				{subtitle}
			</Text>
		</VStack>
	);
});

export default Description;
