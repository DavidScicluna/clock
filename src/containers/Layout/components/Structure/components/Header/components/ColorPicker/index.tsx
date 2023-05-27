import { FC } from 'react';
import { useDispatch } from 'react-redux';

import {
	ColorSwitcher,
	ColorSwitcherOnChangeProps,
	ColorSwitcherScroll,
	ColorSwitcherScrollItem,
	Divider,
	IconButton,
	IconButtonIcon,
	Popper,
	useGetColor,
	useTheme
} from '@davidscicluna/component-library';

import { Text, VStack } from '@chakra-ui/react';

import colors from '../../../../../../../../common/data/colors';
import { useSelector } from '../../../../../../../../common/hooks';
import { setAppColor } from '../../../../../../../../store/slices/App';

const ColorPicker: FC = () => {
	const theme = useTheme();

	const dispatch = useDispatch();
	const color = useSelector((state) => state.app.ui.theme.color);

	const textPrimaryColor = useGetColor({ color: 'gray', type: 'text.primary' });
	const textSecondaryColor = useGetColor({ color: 'gray', type: 'text.secondary' });

	const handleColorChange = ({ color }: ColorSwitcherOnChangeProps): void => {
		if (color) {
			dispatch(setAppColor(color));
		}
	};

	return (
		<Popper
			renderAction={(props) => (
				<IconButton {...props} aria-label='Reset' variant='icon'>
					<IconButtonIcon icon='circle' />
				</IconButton>
			)}
		>
			<VStack
				width='100%'
				height='100%'
				divider={<Divider />}
				alignItems='stretch'
				justifyContent='stretch'
				spacing={2}
				p={2}
			>
				<VStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={0}>
					<Text align='left' color={textPrimaryColor} fontSize='md' fontWeight='semibold'>
						Color Picker
					</Text>
					<Text align='left' color={textSecondaryColor} fontSize='xs'>
						Click on one of the colors below to set the app color
					</Text>
				</VStack>

				<ColorSwitcher color={color} colors={colors} onChange={handleColorChange}>
					<ColorSwitcherScroll
						color='gray'
						renderItem={(props) => (
							<ColorSwitcherScrollItem
								{...props}
								width={theme.fontSizes['4xl']}
								height={theme.fontSizes['4xl']}
								borderRadius='base'
							/>
						)}
					/>
				</ColorSwitcher>
			</VStack>
		</Popper>
	);
};

export default ColorPicker;
