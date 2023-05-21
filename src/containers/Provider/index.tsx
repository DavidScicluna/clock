import { FC } from 'react';

import { DSCLProvider } from '@davidscicluna/component-library';

import { useSelector } from '../../common/hooks';
import Container from '../Container';

const Provider: FC = () => {
	const { color, colorMode } = useSelector((state) => state.app.ui.theme);

	return (
		<DSCLProvider color={color} colorMode={colorMode}>
			<Container />
		</DSCLProvider>
	);
};

export default Provider;
