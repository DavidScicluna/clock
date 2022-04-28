import { FC } from 'react';

import { theme } from '@davidscicluna/component-library';

import { ChakraProvider } from '@chakra-ui/react';

// import { Provider } from 'react-redux';
// import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';

// import store from '../../store';
import Layout from '../Layout';
import Router from '../Router';

// const persistor = persistStore(store);

const Container: FC = () => {
	// const dispatch = useDispatch();
	// const isSplashscreenOpen = useSelector((state) => state.modals.ui.isSplashscreenOpen);

	// useEffect(() => {
	// 	if (isSplashscreenOpen) {
	// 		setTimeout(() => dispatch(toggleSplashscreen(false)), 2500);
	// 	}
	// }, [isSplashscreenOpen]);

	return (
		// <Provider store={store}>
		// 	<PersistGate loading={null} persistor={persistor}>
		<ChakraProvider theme={theme} resetCSS>
			<Router>
				<Layout />
			</Router>
		</ChakraProvider>
		// 	</PersistGate>
		// </Provider>
	);
};

export default Container;
