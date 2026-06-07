import {
  Component,
  forwardRef,
  input,
  output,
  signal,
  computed,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-toggle',
  imports: [],
  templateUrl: './toggle.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    },
  ],
})
export class ToggleComponent implements ControlValueAccessor {
  readonly label = input<string>('');
  readonly description = input<string>('');
  readonly disabled = input(false);
  readonly icon = input<string>('visibility_off');
  readonly checked = input<boolean, boolean>(false, { transform: (v) => v ?? false });

  readonly checkedChange = output<boolean>();

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  protected _checked = signal(false);

  constructor() {
    const initial = computed(() => this.checked());
    queueMicrotask(() => this._checked.set(initial()));
  }

  writeValue(value: boolean): void {
    this._checked.set(value ?? false);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean): void {
    // handled via input
  }

  protected onToggle(): void {
    if (this.disabled()) return;
    const newValue = !this._checked();
    this._checked.set(newValue);
    this.onChange(newValue);
    this.checkedChange.emit(newValue);
    this.onTouched();
  }
}
