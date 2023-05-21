import { FC, lazy } from 'react';
import { Route, Routes as RRDRoutes, useLocation } from 'react-router-dom';

import { AnimatePresence, PageTransition } from '@davidscicluna/component-library';

import NoMatch from './components/NoMatch';
import Suspense from './components/Suspense';

const Alarm = lazy(() => import('../../pages/Alarm'));
const Stopwatch = lazy(() => import('../../pages/Stopwatch'));
const Timer = lazy(() => import('../../pages/Timer'));
const WorldClock = lazy(() => import('../../pages/WorldClock'));

const Routes: FC = () => {
	const location = useLocation();

	return (
		<AnimatePresence>
			<RRDRoutes key={location.pathname} location={location}>
				<Route
					path='/'
					element={
						<Suspense>
							<PageTransition>
								<WorldClock />
							</PageTransition>
						</Suspense>
					}
				/>

				<Route
					path='/alarm'
					element={
						<Suspense>
							<PageTransition>
								<Alarm />
							</PageTransition>
						</Suspense>
					}
				/>

				<Route
					path='/stopwatch'
					element={
						<Suspense>
							<PageTransition>
								<Stopwatch />
							</PageTransition>
						</Suspense>
					}
				/>

				<Route
					path='/timer'
					element={
						<Suspense>
							<PageTransition>
								<Timer />
							</PageTransition>
						</Suspense>
					}
				/>

				<Route path='*' element={<NoMatch />} />
			</RRDRoutes>
		</AnimatePresence>
	);
};

export default Routes;
