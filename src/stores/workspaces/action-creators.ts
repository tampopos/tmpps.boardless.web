import { createActionCreators } from '../redux-helper';
import { Action } from './action';
export const {
  setInvitedWorkspaces,
  clearInvitedWorkspaces,
  addInvitedWorkspaces,
  clearJoinableWorkspaces,
  addJoinableWorkspaces,
} = createActionCreators('workspaces')<Action>(
  'setInvitedWorkspaces',
  'clearInvitedWorkspaces',
  'addInvitedWorkspaces',
  'clearJoinableWorkspaces',
  'addJoinableWorkspaces',
);
