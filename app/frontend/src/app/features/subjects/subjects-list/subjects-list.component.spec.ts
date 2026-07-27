import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SubjectsListComponent } from './subjects-list.component';

describe('SubjectsListComponent', () => {
  let component: SubjectsListComponent;
  let fixture: ComponentFixture<SubjectsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectsListComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject SubjectsStore', () => {
    expect(component.store).toBeTruthy();
  });

  it('should call store.load on init', () => {
    spyOn(component.store, 'load');
    component.ngOnInit();
    expect(component.store.load).toHaveBeenCalled();
  });

  it('should update page on paginator event', () => {
    spyOn(component.store, 'setPage');
    spyOn(component.store, 'load');

    component.onPage({ pageIndex: 1, pageSize: 25, length: 50 });

    expect(component.store.setPage).toHaveBeenCalledWith(2);
    expect(component.store.load).toHaveBeenCalled();
  });

  it('should render heading', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Study Subjects');
  });

  it('should render the subjects grid container', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.subjects-grid')).toBeTruthy();
  });
});
