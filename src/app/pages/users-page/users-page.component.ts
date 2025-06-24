import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from './service/users.service';
import { AppState } from '../../shared/store/app.reducer';
import { Store } from '@ngrx/store';
import { UsersActions } from './store/actions.types';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users-page',
  imports: [RouterOutlet],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
})
export class UsersPageComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(
    private usersService: UsersService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadData(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.usersService
      .getAllUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          this.store.dispatch(UsersActions.setUsersData({ data: data }));
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
