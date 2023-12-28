import {
  useSelector,
  useDispatch,
  TypedUseSelectorHook
} from 'react-redux';

import type {
  TRootState,
  TAppDispatch
} from '../services/store';

type TStoreTool = {
  useStoreDispatch: () => TAppDispatch;
  useStoreSelector: TypedUseSelectorHook<TRootState>;
};

const useStoreTool: TStoreTool = {
  useStoreDispatch: () => useDispatch<TAppDispatch>(),
  useStoreSelector: useSelector,
}

export default useStoreTool;
