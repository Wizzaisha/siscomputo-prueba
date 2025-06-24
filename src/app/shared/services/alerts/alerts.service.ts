import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  alertDuration: number = 5000;

  private messageService: MessageService = inject(MessageService);

  showSuccess(
    summary: string,
    detail: string,
    life: number = this.alertDuration
  ): void {
    this.messageService.add({
      severity: 'success',
      summary,
      detail,
      styleClass: 'bg-success text-success-content',
      life: life,
    });
  }

  showError(
    summary: string,
    detail: string,
    life: number = this.alertDuration
  ): void {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
      styleClass: 'bg-error text-error-content',
      life: life,
    });
  }

  showInfo(
    summary: string,
    detail: string,
    life: number = this.alertDuration
  ): void {
    this.messageService.add({
      severity: 'info',
      summary,
      detail,
      styleClass: 'bg-info text-info-content',
      life: life,
    });
  }

  showWarning(
    summary: string,
    detail: string,
    life: number = this.alertDuration
  ): void {
    this.messageService.add({
      severity: 'warn',
      summary,
      detail,
      styleClass: 'bg-warning text-warning-content',
      life: life,
    });
  }
}
