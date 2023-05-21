import { FC } from 'react';

import Layout from '../Layout';
import Router from '../Router';
import Routes from '../Routes';

const Container: FC = () => {
	return (
		<Router>
			<Layout>
				<Routes />
			</Layout>
		</Router>
	);
};

export default Container;
