import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AlertsService } from '../../../../shared/services/alerts/alerts.service';
import { AppState } from '../../../../shared/store/app.reducer';
import { UsersService } from '../../service/users.service';
import { TextInputComponent } from '../../../../shared/components/inputs/text-input/text-input.component';
import { PrimaryButtonComponent } from '../../../../shared/components/buttons/primary-button/primary-button.component';
import { UserForm } from '../../models/users';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-user-dialog',
  imports: [ReactiveFormsModule, TextInputComponent, PrimaryButtonComponent],
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.css',
})
export class CreateUserDialogComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  get nameField(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get emailField(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get usernameField(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get phoneField(): FormControl {
    return this.form.get('phone') as FormControl;
  }

  get websiteField(): FormControl {
    return this.form.get('website') as FormControl;
  }

  config = inject(DynamicDialogConfig);
  ref = inject(DynamicDialogRef);

  private unsubscribe$ = new Subject<void>();

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      phone: [''],
      website: [''],
    });
  }

  handleSubmitForm(): void {
    this.form.markAsDirty();
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const formData = this.form.getRawValue() as UserForm;
      console.log(formData);
      this.postUser(formData);
    } else {
      this.alertService.showError('Error', 'Form has errors.');
    }
  }

  postUser(dataToSave: UserForm): void {
    this.usersService
      .postUser(dataToSave)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.ref.close({ type: 'saved' });
        },
        error: (error) => {
          this.alertService.showError('Error', 'An error has ocurried.');
        },
      });
  }
}
