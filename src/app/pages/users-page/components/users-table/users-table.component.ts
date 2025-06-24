import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UsersResponse } from '../../models/users';
import { Store } from '@ngrx/store';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { AppState } from '../../../../shared/store/app.reducer';
import { UsersService } from '../../service/users.service';
import { selectAllUsers } from '../../store/selectors';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../../../shared/components/inputs/text-input/text-input.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { UsersActions } from '../../store/actions.types';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { AlertsService } from '../../../../shared/services/alerts/alerts.service';

@Component({
  selector: 'app-users-table',
  imports: [TableModule, CommonModule, TextInputComponent, ReactiveFormsModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
  providers: [DialogService],
})
export class UsersTableComponent implements OnInit, OnDestroy {
  users$!: Observable<UsersResponse[]>;

  form!: FormGroup;

  userDetailsRef: DynamicDialogRef | undefined;

  get searchField(): FormControl {
    return this.form.get('searchValue') as FormControl;
  }

  private unsubscribe$ = new Subject<void>();

  constructor(
    private usersService: UsersService,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadStoreData();
    this.formChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm(): void {
    this.form = this.fb.group({
      searchValue: [''],
    });
  }

  loadStoreData(): void {
    this.users$ = this.store.select(selectAllUsers);
  }

  formChanges(): void {
    this.searchField.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((value) => {
        if (value === '') {
          this.getAllUsers();
        } else {
          this.getUserByName(value);
        }
      });
  }

  handleUserDetails(user: UsersResponse): void {
    this.userDetailsRef = this.dialogService.open(UserDetailsComponent, {
      modal: true,
      dismissableMask: true,
      closable: true,
      header: 'User details',
      width: '40vw',
      data: {
        userData: user,
      },
    });
  }

  getUserByName(name: string): void {
    this.usersService
      .getUserByName(name)
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

  getAllUsers(): void {
    this.usersService
      .getAllUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
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
