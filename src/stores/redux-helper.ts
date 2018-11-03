import { combineReducers, createStore as createReduxStore } from 'redux';
import { createMappedObject } from 'src/common/object-helper';
import { ReducerBuilders } from './types';
import actionCreatorFactory, { ActionCreator } from 'typescript-fsa';
import { StoredState } from './stored-state';

export const createStore = <TStoredState extends {} = StoredState>(
  state: TStoredState,
  builders: ReducerBuilders<TStoredState>,
  enhancer: any,
) => {
  const reducers = createMappedObject(state, builders);
  const combinedReducers = combineReducers<TStoredState>(reducers);
  const store = createReduxStore(combinedReducers, enhancer);
  return store;
};
export const createActionCreators = <TStoredState extends {} = StoredState>(
  stateKey: keyof TStoredState & string,
) => <TAction extends {}>(...actionKeys: Array<keyof TAction & string>) => {
  const factory = actionCreatorFactory(stateKey);
  return actionKeys.reduce(
    (o, k) => {
      type value = TAction[typeof k];
      o[k] = factory<value>(k);
      return o;
    },
    {} as { [P in keyof TAction]: ActionCreator<TAction[P]> },
  );
};
