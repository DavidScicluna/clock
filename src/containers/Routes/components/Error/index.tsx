import { FC } from 'react';

import { Divider } from '@davidscicluna/component-library';

import { Center, ColorMode, HStack, useColorMode, useMediaQuery, VStack } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import Actions from './components/Actions';
import Code from './components/Code';
import Description from './components/Description';
import { ErrorProps } from './types';

const Error: FC<ErrorProps> = (props) => {
	const { colorMode: colorModeHook } = useColorMode();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const [descriptionRef, { height }] = useElementSize();

	const { color, colorMode: colorModeProp, code = 404, title, subtitle } = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	return (
		<Center width='100%' minHeight='100%'>
			<VStack spacing={4} p={isSm ? 2 : 4}>
				{isSm ? (
					<VStack alignItems='flex-start' divider={<Divider />} spacing={1}>
						<Code color={color} colorMode={colorMode} code={code} />
						<Description colorMode={colorMode} title={title} subtitle={subtitle} />
					</VStack>
				) : (
					<HStack divider={<Divider orientation='vertical' height={`${height}px`} />} spacing={2}>
						<Code color={color} colorMode={colorMode} code={code} />
						<Description ref={descriptionRef} colorMode={colorMode} title={title} subtitle={subtitle} />
					</HStack>
				)}

				<Actions color={color} colorMode={colorMode} size='md' />
			</VStack>
		</Center>
	);
};

export default Error;
