import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ResidentDetailComponent } from './resident-detail.component';

describe('ResidentDetailComponent', () => {
  let component: ResidentDetailComponent;
  let fixture: ComponentFixture<ResidentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentDetailComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
