import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ClusterMapComponent } from './cluster-map.component';

describe('ClusterMapComponent', () => {
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClusterMapComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  function flushHttp(): void {
    const areasReq = httpTesting.expectOne('/data/cluster-map-areas.json');
    areasReq.flush([
      {
        shape: 'rect',
        coords: [631, 187, 576, 119],
        href: '',
        alt: '',
        title: 'Y03/01',
      },
      {
        shape: 'rect',
        coords: [633, 119, 671, 189],
        href: '',
        alt: '',
        title: 'Y03/03',
      },
    ]);

    const detailsReq = httpTesting.expectOne('/data/cluster-map-details.json');
    detailsReq.flush([
      {
        id: 'Y03/01',
        houseNumber: 'Y03/01',
        ownerName: 'Bpk. Ahmad Subarjo',
        ownerPhotoUrl: '',
      },
      {
        id: 'Y03/03',
        houseNumber: 'Y03/03',
        ownerName: 'Ibu Siti Aminah',
        ownerPhotoUrl: '',
      },
    ]);
  }

  it('should create', () => {
    const fixture = TestBed.createComponent(ClusterMapComponent);
    flushHttp();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have 2 areas with required fields', () => {
    const fixture = TestBed.createComponent(ClusterMapComponent);
    flushHttp();
    const areas = fixture.componentInstance.areas();
    expect(areas.length).toBe(2);
    areas.forEach((area) => {
      expect(area.id).toBeTruthy();
      expect(area.ownerName).toBeTruthy();
      expect(area.houseNumber).toBeTruthy();
      expect(area.coords.length).toBe(4);
    });
  });

  it('should toggle area on click', () => {
    const fixture = TestBed.createComponent(ClusterMapComponent);
    flushHttp();
    const area = fixture.componentInstance.areas()[0];
    fixture.componentInstance.hoveredArea.set(area);
    fixture.componentInstance.toggleArea(area);
    expect(fixture.componentInstance.hoveredArea()).toBeNull();
    fixture.componentInstance.toggleArea(area);
    expect(fixture.componentInstance.hoveredArea()).toEqual(area);
  });

  it('should open modal when openModal is called', () => {
    const fixture = TestBed.createComponent(ClusterMapComponent);
    flushHttp();
    fixture.componentInstance.openModal();
    expect(fixture.componentInstance.showModal()).toBe(true);
  });

  it('should close modal when closeModal is called', () => {
    const fixture = TestBed.createComponent(ClusterMapComponent);
    flushHttp();
    fixture.componentInstance.openModal();
    expect(fixture.componentInstance.showModal()).toBe(true);
    fixture.componentInstance.closeModal();
    expect(fixture.componentInstance.showModal()).toBe(false);
  });
});
