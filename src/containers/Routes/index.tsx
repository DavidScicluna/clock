import { ReactElement, FC, lazy } from 'react';

import { useConst } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { RouteObject, useLocation, Routes as RRDRoutes, Route } from 'react-router-dom';

import Animation from './components/Animation';
import NoMatch from './components/NoMatch';
import Suspense from './components/Suspense';

// const Alarm = lazy(() => import('../../pages/Alarm'));
const Stopwatch = lazy(() => import('../../pages/Stopwatch'));
const Timer = lazy(() => import('../../pages/Timer'));
// const WorldClock = lazy(() => import('../../pages/WorldClock'));

export const handleReturnRoutes = (): RouteObject[] => {
	return [
		// {
		// 	path: '/',
		// 	element: <WorldClock />
		// },
		// {
		// 	path: '/alarm',
		// 	element: <Alarm />
		// },
		{
			path: '/stopwatch',
			element: <Stopwatch />
		},
		{
			path: '/timer',
			element: <Timer />
		},
		{
			path: '*',
			element: <NoMatch />
		}
	];
};

const handleReturnRoute = (route: Omit<RouteObject, 'index'>, index: string): ReactElement => {
	const { path, element, children = [] } = route;

	return (
		<Route
			{...route}
			key={index}
			path={path}
			element={
				<Suspense>
					<Animation>{element}</Animation>
				</Suspense>
			}
		>
			{children.map((child, childIndex) => handleReturnRoute(child, `${index}${childIndex}`))}
		</Route>
	);
};

const Routes: FC = () => {
	const location = useLocation();

	const routes = useConst<RouteObject[]>(handleReturnRoutes());

	return (
		<AnimatePresence exitBeforeEnter initial={false}>
			<RRDRoutes key={location.pathname} location={location}>
				{routes.map((route, index) => handleReturnRoute(route, `${index}`))}
			</RRDRoutes>
		</AnimatePresence>
	);
};

export default Routes;
