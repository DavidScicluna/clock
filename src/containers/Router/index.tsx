import { FC } from 'react';

import { BrowserRouter as RRDRouter, BrowserRouterProps as RouterProps } from 'react-router-dom';

const Router: FC<RouterProps> = ({ children }) => {
	return <RRDRouter basename={process.env.PUBLIC_URL}>{children}</RRDRouter>;
};

export default Router;
