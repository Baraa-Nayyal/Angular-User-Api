import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject, delay, Observable, tap } from 'rxjs';
import { selectSelectedUser } from '../store/user/user.selectors';
import {
  InvokeGetUserById,
  GetUserByIdSuccess,
} from '../store/user/user.action';
import { User } from '../store/user/user.dto';
import { CommonModule } from '@angular/common';
import { Actions, ofType } from '@ngrx/effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './user-details.component.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailComponent implements OnInit {
  user$: Observable<User | null>;
  loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private actions$: Actions
  ) {}

  ngOnInit() {
    this.loading$.next(true);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(InvokeGetUserById({ id }));
    this.user$ = this.store.select(selectSelectedUser);
    this.actions$
      .pipe(
        ofType(GetUserByIdSuccess),
        delay(500), // ℹ️ placeholder just to show the spinner
        tap(() => this.loading$.next(false))
      )
      .subscribe();
  }
}
