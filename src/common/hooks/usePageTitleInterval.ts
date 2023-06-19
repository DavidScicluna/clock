import { useState } from 'react';

import { Nullable } from '@davidscicluna/component-library';

import { useInterval } from 'usehooks-ts';

type UsePageTitleIntervalProps = { defaultTitle?: string; interval?: number };
type UsePageTitleIntervalReturn = { onSetMessage: (message: string) => void; onReset: () => void };

// TODO: Move to component-lib
const usePageTitleInterval = (props: UsePageTitleIntervalProps): UsePageTitleIntervalReturn => {
	const { defaultTitle = document.title, interval = 1000 } = props;

	const [message, setMessage] = useState<Nullable<string>>(null);

	const handleReset = (): void => {
		document.title = defaultTitle;
		setMessage(null);
	};

	const handleUpdate = (): void => {
		if (message) {
			document.title = document.title === message ? defaultTitle : message;
		} else {
			handleReset();
		}
	};

	useInterval(() => handleUpdate(), message ? interval : null);

	return { onSetMessage: setMessage, onReset: handleReset };
};

export default usePageTitleInterval;
