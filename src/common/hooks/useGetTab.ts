import { useMemo } from 'react';

import { Undefinable } from '@davidscicluna/component-library';

import tabs, { Tab, TabID } from '../data/tabs';

const useGetTab = (id: TabID): Undefinable<Tab> => {
	const tab = useMemo((): Undefinable<Tab> => {
		return tabs.find(({ id: i }) => i === id);
	}, [id]);

	return tab;
};

export default useGetTab;
