import {
  useSelector as selectorHook,
  useDispatch as dispatchHook,
  TypedUseSelectorHook
} from 'react-redux';
import type { TRootState, TAppDispatch } from '../services/store';

const useDispatch = () => dispatchHook<TAppDispatch>();
const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;

export {
  useDispatch,
  useSelector
};
