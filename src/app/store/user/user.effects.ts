import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../user.service';
import {
  InvokeGetUserList,
  GetUserListSuccess,
  InvokeGetUserById,
  GetUserByIdSuccess,
} from './user.action';
import { map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvokeGetUserList),
      tap(() => console.log('Effect triggered for InvokeGetUserList action')),
      mergeMap((action) =>
        this.userService
          .getUsers(action.page)
          .pipe(
            map((response) =>
              GetUserListSuccess({ users: response.data, page: action.page,total_pages: response.total_pages, })
            )
          )
      )
    );
  });

  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvokeGetUserById),
      mergeMap((action) =>
        this.userService
          .getUserById(action.id)
          .pipe(map((user) => GetUserByIdSuccess({ user })))
      )
    )
  );
}
