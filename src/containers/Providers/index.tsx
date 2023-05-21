import { FC } from 'react';
import { Provider as StoreProvider } from 'react-redux';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import store from '../../store';
import Provider from '../Provider';

const persistor = persistStore(store);

const Providers: FC = () => {
	return (
		<StoreProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Provider />
			</PersistGate>
		</StoreProvider>
	);
};

export default Providers;
