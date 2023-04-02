import { FC } from 'react';

import { useTheme, getColor, IconButton, Icon } from '@davidscicluna/component-library';

import { useColorMode, VStack, ButtonGroup, Text } from '@chakra-ui/react';


import { ItemProps } from './types';

const Item: FC<ItemProps> = ({ caption, value = 0, minValue, maxValue, onClick }) => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	return (
		<VStack align='center' justify='center' spacing={2}>
			<Text
				align='center'
				color={getColor({ theme, colorMode, type: 'text.secondary' })}
				fontSize='xl'
				fontWeight='semibold'
				textTransform='uppercase'
				whiteSpace='nowrap'
				userSelect='none'
			>
				{caption}
			</Text>

			{/* TODO: Create a ButtonGroup in component library that handles borderradius on its own */}
			{/* TODO: Add Tooltip  in component library */}
			<ButtonGroup isAttached>
				<IconButton
					aria-label='Add 1'
					isDisabled={value >= maxValue}
					onClick={() => onClick(value + 1)}
					size='xl'
					variant='outlined'
					sx={{ '&::before': { borderRadius: `${theme.radii.lg} 0 0 ${theme.radii.lg}` } }}
				>
					<Icon icon='keyboard_arrow_up' type='outlined' />
				</IconButton>
				<IconButton
					aria-label='Add 10'
					isDisabled={value >= maxValue}
					onClick={() => onClick(value + 10)}
					size='xl'
					variant='outlined'
					sx={{ '&::before': { borderRadius: `0 ${theme.radii.lg} ${theme.radii.lg} 0` } }}
				>
					<Icon icon='keyboard_double_arrow_up' type='outlined' />
				</IconButton>
			</ButtonGroup>

			<Text
				align='center'
				color={getColor({ theme, colorMode, type: 'text.primary' })}
				fontSize='8xl'
				fontFamily='mono'
				userSelect='none'
			>
				{value >= 10 ? value : `0${value}`}
			</Text>

			<ButtonGroup isAttached>
				<IconButton
					aria-label='Subtract 1'
					isDisabled={value <= minValue}
					onClick={() => onClick(value - 1)}
					size='xl'
					variant='outlined'
					sx={{ '&::before': { borderRadius: `${theme.radii.lg} 0 0 ${theme.radii.lg}` } }}
				>
					<Icon icon='keyboard_arrow_down' type='outlined' />
				</IconButton>
				<IconButton
					aria-label='Subtract 10'
					isDisabled={value <= minValue}
					onClick={() => onClick(value - 10)}
					size='xl'
					variant='outlined'
					sx={{ '&::before': { borderRadius: `0 ${theme.radii.lg} ${theme.radii.lg} 0` } }}
				>
					<Icon icon='keyboard_double_arrow_down' type='outlined' />
				</IconButton>
			</ButtonGroup>
		</VStack>
	);
};

export default Item;
