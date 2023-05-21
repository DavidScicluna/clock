import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { State } from '../../store/common/types';

const useSelectorTyped: TypedUseSelectorHook<State> = useSelector;

export default useSelectorTyped;
