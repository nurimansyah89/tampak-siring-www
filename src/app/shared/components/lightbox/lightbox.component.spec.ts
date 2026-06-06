import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LightboxComponent } from './lightbox.component';

describe('LightboxComponent', () => {
  let component: LightboxComponent;
  let fixture: ComponentFixture<LightboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LightboxComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('images', ['img1.jpg', 'img2.jpg', 'img3.jpg']);
    component.currentIndex.set(0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display current image', () => {
    expect(component.currentImage).toBe('img1.jpg');
  });

  it('should navigate to next image', () => {
    component.onNext(new MouseEvent('click'));
    expect(component.currentIndex()).toBe(1);
    expect(component.currentImage).toBe('img2.jpg');
  });

  it('should navigate to previous image', () => {
    component.currentIndex.set(1);
    component.onPrev(new MouseEvent('click'));
    expect(component.currentIndex()).toBe(0);
    expect(component.currentImage).toBe('img1.jpg');
  });

  it('should not go beyond first image on prev', () => {
    component.onPrev(new MouseEvent('click'));
    expect(component.currentIndex()).toBe(0);
  });

  it('should not go beyond last image on next', () => {
    component.currentIndex.set(2);
    component.onNext(new MouseEvent('click'));
    expect(component.currentIndex()).toBe(2);
  });

  it('should emit close on backdrop click', () => {
    spyOn(component.close, 'emit');
    component.onBackdropClick();
    expect(component.close.emit).toHaveBeenCalled();
  });
});
