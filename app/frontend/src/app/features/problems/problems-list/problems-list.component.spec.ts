import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProblemsListComponent } from './problems-list.component';

describe('ProblemsListComponent', () => {
  let component: ProblemsListComponent;
  let fixture: ComponentFixture<ProblemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemsListComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProblemsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject ProblemsStore', () => {
    expect(component.problemsStore).toBeTruthy();
  });

  it('should inject FiltersStore', () => {
    expect(component.filtersStore).toBeTruthy();
  });

  it('should call filtersStore.loadOptions on init', () => {
    spyOn(component.filtersStore, 'loadOptions');
    component.ngOnInit();
    expect(component.filtersStore.loadOptions).toHaveBeenCalled();
  });

  it('should update page on paginator event', () => {
    spyOn(component.problemsStore, 'setPage');
    spyOn(component.problemsStore, 'setPageSize');
    spyOn(component.problemsStore, 'load');

    component.onPage({ pageIndex: 2, pageSize: 50, length: 100 });

    expect(component.problemsStore.setPage).toHaveBeenCalledWith(3);
    expect(component.problemsStore.setPageSize).toHaveBeenCalledWith(50);
    expect(component.problemsStore.load).toHaveBeenCalled();
  });

  it('should render the filter panel', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.filter-panel')).toBeTruthy();
  });

  it('should render the results section', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.results')).toBeTruthy();
  });
});
