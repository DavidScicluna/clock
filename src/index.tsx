/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRoot } from 'react-dom/client';

import Container from './containers/Container';

// Importing Main Font (Roboto)
import '@fontsource/roboto';
import '@fontsource/roboto-mono';
import '@fontsource/roboto-slab';

// Importing Material UI Icons
import '@fontsource/material-icons';
import '@fontsource/material-icons-outlined';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<Container />);
