import {
  Component,
  input,
  signal,
  forwardRef,
  viewChild,
  ElementRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  readonly type = input<'text' | 'password'>('text');
  readonly id = input<string>('');
  readonly placeholder = input<string>('');
  readonly label = input<string>('');
  readonly leftIcon = input<string>('');
  readonly disabled = input(false);
  readonly error = input<string>('');

  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('inputEl');

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  value = signal('');

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.inputRef()?.nativeElement.setAttribute('disabled', '');
    } else {
      this.inputRef()?.nativeElement.removeAttribute('disabled');
    }
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
