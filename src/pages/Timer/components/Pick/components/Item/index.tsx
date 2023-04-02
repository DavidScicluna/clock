import { FC } from 'react';

import { useTheme, getColor, ButtonGroup, IconButton, Icon } from '@davidscicluna/component-library';

import { useColorMode, VStack, Text } from '@chakra-ui/react';

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

			<ButtonGroup isAttached>
				<IconButton
					aria-label='Add 1'
					isDisabled={value >= maxValue}
					onClick={() => onClick(value + 1)}
					size='xl'
					variant='outlined'
				>
					<Icon icon='keyboard_arrow_up' type='outlined' />
				</IconButton>
				<IconButton
					aria-label='Add 10'
					isDisabled={value >= maxValue}
					onClick={() => onClick(value + 10)}
					size='xl'
					variant='outlined'
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
				>
					<Icon icon='keyboard_arrow_down' type='outlined' />
				</IconButton>
				<IconButton
					aria-label='Subtract 10'
					isDisabled={value <= minValue}
					onClick={() => onClick(value - 10)}
					size='xl'
					variant='outlined'
				>
					<Icon icon='keyboard_double_arrow_down' type='outlined' />
				</IconButton>
			</ButtonGroup>
		</VStack>
	);
};

export default Item;
