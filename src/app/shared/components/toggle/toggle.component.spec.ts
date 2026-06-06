import { TestBed } from '@angular/core/testing';
import { ToggleComponent } from './toggle.component';

describe('ToggleComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ToggleComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should toggle checked state on click', () => {
    const fixture = TestBed.createComponent(ToggleComponent);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(fixture.componentInstance.checked()).toBe(false);

    button.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.checked()).toBe(true);

    button.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.checked()).toBe(false);
  });

  it('should emit checkedChange on toggle', () => {
    const fixture = TestBed.createComponent(ToggleComponent);
    fixture.detectChanges();

    const spy = spyOn(fixture.componentInstance.checkedChange, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should display label and description', () => {
    const fixture = TestBed.createComponent(ToggleComponent);
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('description', 'Test Description');
    fixture.detectChanges();

    const element = fixture.nativeElement;
    expect(element.textContent).toContain('Test Label');
    expect(element.textContent).toContain('Test Description');
  });

  it('should write value via ControlValueAccessor', () => {
    const fixture = TestBed.createComponent(ToggleComponent);
    fixture.detectChanges();

    fixture.componentInstance.writeValue(true);
    expect(fixture.componentInstance.checked()).toBe(true);
  });

  it('should register onChange callback', () => {
    const fixture = TestBed.createComponent(ToggleComponent);
    fixture.detectChanges();

    const fn = () => {};
    fixture.componentInstance.registerOnChange(fn);
    expect(fixture.componentInstance['onChange']).toBe(fn);
  });
});
