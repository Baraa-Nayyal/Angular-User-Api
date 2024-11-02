import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../store/user/user.dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  BehaviorSubject,
  delay,
  finalize,
  map,
  Observable,
  take,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectPage,
  selectTotalPages,
  selectUsers,
} from '../store/user/user.selectors';
import {
  GetUserListSuccess,
  InvokeGetUserList,
} from '../store/user/user.action';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PaginationComponent } from '../pagination/pagination.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Actions, ofType } from '@ngrx/effects';
import { MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user-list',
  standalone: true,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    PaginationComponent,
    MatProgressSpinnerModule,
    MatIconModule,
    TextFieldModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  page$: Observable<number>;
  currentPage: number = 1;
  totalPages$: Observable<number>;
  loading$ = new BehaviorSubject<boolean>(false);
  searchVal = '';
  filteredUsers$: Observable<User[]>;

  constructor(private store: Store, private actions$: Actions) {}

  ngOnInit() {
    this.users$ = this.store.select(selectUsers);
    this.page$ = this.store.select(selectPage);
    this.totalPages$ = this.store.select(selectTotalPages);

    this.actions$
      .pipe(
        ofType(GetUserListSuccess),
        delay(500), 
        tap(() => this.loading$.next(false))
      )
      .subscribe();

    this.filteredUsers$ = this.users$.pipe(
      map((users) => this.filterUsers(users, this.searchVal))
    );

    this.loadUsers(this.currentPage);
  }

  filterUsers(users: User[], searchVal: string): User[] {
    if (!searchVal) {
      return users;
    }
    const lowerCaseSearchVal = searchVal.toLowerCase();
    return users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(lowerCaseSearchVal) ||
        user.last_name.toLowerCase().includes(lowerCaseSearchVal) ||
        user.id.toString().includes(lowerCaseSearchVal)
    );
  }

  onSearchChange(searchValue: string) {
    this.searchVal = searchValue;
    this.filteredUsers$ = this.users$.pipe(
      map((users) => this.filterUsers(users, this.searchVal))
    );
  }

  loadUsers(page: number) {
    this.loading$.next(true);
    this.store.dispatch(InvokeGetUserList({ page }));
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadUsers(page);
    console.log('hello');
  }
}
