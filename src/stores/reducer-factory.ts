import { StoredState } from './stored-state';
import { compose } from 'redux';
import { StoreProviderProps } from 'src/pages/shared/store-provider';
import { accountsReducer } from './accounts/reducer';
import { messagesReducer } from './messages/reducer';
import { sideMenuReducer } from './side-menu/reducer';
import { createLocalstorageSetting } from './localstorage';
import { themeReducer } from './theme/reducer';
import { workspacesReducer } from './workspaces/reducer';
import { createStore } from './redux-helper';
import { ReducerBuilders } from './types';

const enhancer = compose(createLocalstorageSetting('accounts'));
const builders: ReducerBuilders<StoredState> = {
  accounts: accountsReducer,
  messages: messagesReducer,
  sideMenu: sideMenuReducer,
  theme: themeReducer,
  workspaces: workspacesReducer,
};
export const createAppStore = (props: StoreProviderProps) =>
  createStore(props.initialState, builders, enhancer);
