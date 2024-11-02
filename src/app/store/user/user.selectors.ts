import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.dto';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectSelectedUser = createSelector(
  selectUserState,
  (state) => state.selectedUser
);

export const selectPage = createSelector(
  selectUserState,
  (state) => state.page
);

export const selectTotalPages = createSelector(selectUserState, (state) => state.total_pages);
