import { TestBed } from '@angular/core/testing';
import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FileUploadComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display label when no file is selected', () => {
    const fixture = TestBed.createComponent(FileUploadComponent);
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();

    const element = fixture.nativeElement;
    expect(element.textContent).toContain('Test Label');
  });

  it('should show file info after file is set', () => {
    const fixture = TestBed.createComponent(FileUploadComponent);
    fixture.detectChanges();

    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
    fixture.componentInstance['setFile'](file);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('test.jpg');
  });

  it('should emit fileChange when file is selected', () => {
    const fixture = TestBed.createComponent(FileUploadComponent);
    fixture.detectChanges();

    const spy = spyOn(fixture.componentInstance.fileChange, 'emit');
    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
    fixture.componentInstance['setFile'](file);
    expect(spy).toHaveBeenCalledWith(file);
  });

  it('should clear file and emit null on remove', () => {
    const fixture = TestBed.createComponent(FileUploadComponent);
    fixture.detectChanges();

    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
    fixture.componentInstance['setFile'](file);
    fixture.detectChanges();

    const spy = spyOn(fixture.componentInstance.fileChange, 'emit');
    fixture.componentInstance.removeFile();
    expect(fixture.componentInstance.selectedFile()).toBeNull();
    expect(spy).toHaveBeenCalledWith(null);
  });
});
