import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  FormControl,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-number-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true,
    },
    provideNgxMask(),
  ],
})
export class NumberInputComponent {
  @Input() labelText: string = '';
  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() id!: string;
  @Input() showLabel: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() suffix: string = '';

  @Input() allowNegativeNumbers: boolean = false;

  @Output() change = new EventEmitter<Event>();

  onChange(event: Event) {
    this.change.emit(event);
  }
  private onTouched = () => {};

  constructor() {}

  ngOnInit(): void {}

  writeValue(value: any): void {
    if (value) {
      this.control.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.control.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.control.errors;
  }

  onBlur(): void {
    this.onTouched();
  }
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let filteredValue = inputElement.value.replace(/[^0-9]/g, '');

    if (inputElement.value !== filteredValue) {
      inputElement.value = filteredValue;
      this.control.setValue(filteredValue, { emitEvent: false });
    }
  }
}
