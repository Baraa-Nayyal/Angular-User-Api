import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-details/user-details.component';
import { provideEffects } from '@ngrx/effects';

export const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  { path: 'user/:id', component: UserDetailComponent },
];
