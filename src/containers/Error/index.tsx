import { FC } from 'react';

import { Badge, BadgeLabel, useGetThemeAppearance, useTheme, utils } from '@davidscicluna/component-library';

import { Center, Text, VStack } from '@chakra-ui/react';

import { ErrorProps } from './common/types';

const { getColor } = utils;

const Error: FC<ErrorProps> = ({ code, title, subtitle, renderActions }) => {
	const theme = useTheme();

	const { color, colorMode } = useGetThemeAppearance();

	return (
		<Center width='100%' height='100%' minHeight='inherit'>
			<VStack alignItems='center' justifyContent='center' spacing={2}>
				<Badge color={color} variant='light'>
					<BadgeLabel textTransform='uppercase'>{`Error ${code}`}</BadgeLabel>
				</Badge>

				<VStack alignItems='center' justifyContent='center' spacing={0.5}>
					<Text
						align='left'
						color={getColor({ theme, colorMode, type: 'text.primary' })}
						fontSize='4xl'
						fontWeight='bold'
					>
						{title}
					</Text>
					<Text align='left' color={getColor({ theme, colorMode, type: 'text.secondary' })} fontSize='md'>
						{subtitle}
					</Text>
				</VStack>

				{renderActions ? renderActions({ color, colorMode, size: 'md', variant: 'contained' }) : null}
			</VStack>
		</Center>
	);
};

export default Error;
