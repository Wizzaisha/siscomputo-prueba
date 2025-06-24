import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { UsersResponse } from '../../models/users';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  userData!: UsersResponse;

  private unsubscribe$ = new Subject<void>();

  config = inject(DynamicDialogConfig);
  ref = inject(DynamicDialogRef);

  constructor() {}

  ngOnInit(): void {
    this.loadDialogData();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadDialogData(): void {
    if (this.config && this.config.data) {
      this.userData = this.config.data['userData'];

      console.log(this.userData);
    }
  }
}
