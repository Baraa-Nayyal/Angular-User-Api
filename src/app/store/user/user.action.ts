import { createAction, props } from '@ngrx/store';
import { User } from './user.dto';


export const InvokeGetUserList = createAction(
  'Invoke get user list API',
  props<{ page: number }>()
);

export const GetUserListSuccess = createAction(
  'Get user list success',
  props<{ users: User[], page: number, total_pages: number }>()
);

export const InvokeGetUserById = createAction(
  'Invoke get user by ID',
  props<{ id: number }>()
);

export const GetUserByIdSuccess = createAction(
  'Get user by ID success',
  props<{ user: User }>()
);