import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { AnimatePresence, Fade, IconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { Grid, GridItem } from '@chakra-ui/react';

import { useSelector } from '../../../../../../../../common/hooks';
import { setAppColorMode } from '../../../../../../../../store/slices/App';

const ToggleColorMode: FC = () => {
	const dispatch = useDispatch();
	const colorMode = useSelector((state) => state.app.ui.theme.colorMode);

	const handleSetColorMode = (): void => {
		switch (colorMode) {
			case 'light': {
				dispatch(setAppColorMode('system'));
				break;
			}
			case 'system': {
				dispatch(setAppColorMode('dark'));
				break;
			}
			case 'dark': {
				dispatch(setAppColorMode('light'));
				break;
			}
		}
	};

	return (
		<AnimatePresence>
			<IconButton
				aria-label='Toggle Application Appearence'
				color='gray'
				onClick={() => handleSetColorMode()}
				variant='icon'
			>
				<Grid
					width='100%'
					height='100%'
					templateColumns='1fr'
					templateRows='1fr'
					alignItems='stretch'
					alignContent='stretch'
					justifyContent='stretch'
					gap={0}
				>
					<GridItem as={Fade} rowStart={1} colStart={1} in={colorMode === 'light'}>
						<IconButtonIcon icon='light_mode' />
					</GridItem>
					<GridItem as={Fade} rowStart={1} colStart={1} in={colorMode === 'system'}>
						<IconButtonIcon icon='contrast' />
					</GridItem>
					<GridItem as={Fade} rowStart={1} colStart={1} in={colorMode === 'dark'}>
						<IconButtonIcon icon='dark_mode' />
					</GridItem>
				</Grid>
			</IconButton>
		</AnimatePresence>
	);
};

export default ToggleColorMode;
