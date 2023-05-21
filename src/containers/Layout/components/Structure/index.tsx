import { FC, lazy, Suspense } from 'react';

import { useIsFirstRender } from 'usehooks-ts';

// import { Suspense } from '../../../../components';
// import { useLayoutContext } from '../../common/hooks';
// import DummyStructureDesktop from './components/DummyStructureDesktop';
// import DummyStructureMobileTablet from './components/DummyStructureMobileTablet';
import { StructureProps } from './common/types';

const StructureMobileTablet = lazy(() => import('./components/StructureMobileTablet'));
const StructureDesktop = lazy(() => import('./components/StructureDesktop'));

const Structure: FC<StructureProps> = ({ children, device }) => {
	const isFirstRender = useIsFirstRender();

	if (!isFirstRender && device) {
		switch (device) {
			case 'desktop':
				return (
					<Suspense
					// fallback={<DummyStructureDesktop>{children}</DummyStructureDesktop>}
					>
						<StructureDesktop>{children}</StructureDesktop>
					</Suspense>
				);
			default:
				return (
					<Suspense
					// fallback={<DummyStructureMobileTablet device='mobile'>{children}</DummyStructureMobileTablet>}
					>
						<StructureMobileTablet device={device}>{children}</StructureMobileTablet>
					</Suspense>
				);
		}
	} else {
		return null;
	}
};

export default Structure;
