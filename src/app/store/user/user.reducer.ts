import { createReducer, on } from '@ngrx/store';
import { User, UserState } from './user.dto';
import {
  InvokeGetUserById,
  GetUserByIdSuccess,
  GetUserListSuccess,
  InvokeGetUserList,
} from './user.action';

export const initialState: UserState = {
  users: [],
  selectedUser: null,
  page: 1,
  per_page: 6, // ℹ️ Default items per page
  total: 0,
  total_pages: 1,
};

export const userReducer = createReducer(
  initialState,
  on(InvokeGetUserList, (state, { page }) => ({
    ...state,
    page,
  })),
  on(GetUserListSuccess, (state, { users, page, total_pages }) => ({
    ...state,
    users,
    page,
    total_pages,
  })),
  on(InvokeGetUserById, (state) => ({
    ...state,
    selectedUser: null,
  })),
  on(GetUserByIdSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
  }))
);
