import { FC } from 'react';

import { BrowserRouter, BrowserRouterProps as RouterProps } from 'react-router-dom';

import { useEffectOnce } from 'usehooks-ts';

const basename = import.meta.env.BASE_URL;

const Router: FC<RouterProps> = ({ children }) => {
	const handleRedirectToBasename = (): void => {
		if (!window.location.pathname.includes(basename)) {
			window.history.replaceState('', '');
			window.location.reload();
		}
	};

	useEffectOnce(() => handleRedirectToBasename());

	return <BrowserRouter basename={basename}>{children}</BrowserRouter>;
};

export default Router;
