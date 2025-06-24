import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from './service/users.service';
import { AppState } from '../../shared/store/app.reducer';
import { Store } from '@ngrx/store';
import { UsersActions } from './store/actions.types';
import { RouterOutlet } from '@angular/router';
import { AlertsService } from '../../shared/services/alerts/alerts.service';

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
    private store: Store<AppState>,
    private alertService: AlertsService
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
          if (data.length === 0) {
            this.alertService.showWarning('Warning', 'Not data found.');
          }

          this.store.dispatch(UsersActions.setUsersData({ data: data }));
        },
        error: (error) => {
          this.alertService.showError(
            'Error',
            'An error has ocurred with the API.'
          );
        },
      });
  }
}
