import { FC, lazy } from 'react';
import { Route, RouteObject, Routes as RRDRoutes, useLocation } from 'react-router-dom';

import { AnimatePresence } from '@davidscicluna/component-library';

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
		// 	path: '/',
		// 	element: <Alarm />
		// },
		{
			path: '/',
			element: <Stopwatch />
		},
		{
			path: '/',
			element: <Timer />
		},
		{
			path: '*',
			element: <NoMatch />
		}
	];
};

const Routes: FC = () => {
	const location = useLocation();

	return (
		<AnimatePresence>
			<RRDRoutes key={location.pathname} location={location}>
				<Route
					path='/'
					// element={<WorldClock />}
				/>

				<Route
					path='/alarm'
					//  element={<Alarm />}
				/>

				<Route
					path='/stopwatch'
					element={
						<Suspense>
							<Animation>
								<Stopwatch />
							</Animation>
						</Suspense>
					}
				/>

				<Route
					path='/timer'
					element={
						<Suspense>
							<Animation>
								<Timer />
							</Animation>
						</Suspense>
					}
				/>

				<Route path='*' element={<NoMatch />} />
			</RRDRoutes>
		</AnimatePresence>
	);
};

export default Routes;
