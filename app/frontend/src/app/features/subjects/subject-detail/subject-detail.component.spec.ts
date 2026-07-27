import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentRef } from '@angular/core';
import { SubjectDetailComponent } from './subject-detail.component';
import { MarkdownService } from '../../../core/services/markdown.service';

describe('SubjectDetailComponent', () => {
  let component: SubjectDetailComponent;
  let fixture: ComponentFixture<SubjectDetailComponent>;
  let componentRef: ComponentRef<SubjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectDetailComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MarkdownService, useValue: { render: (text: string) => text ?? '' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectDetailComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('id', 'test-subject');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have id input', () => {
    expect(component.id()).toBe('test-subject');
  });

  it('should inject SubjectsStore', () => {
    expect(component.store).toBeTruthy();
  });

  it('should render back link', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const backLink = compiled.querySelector('a[routerLink="/subjects"]');
    expect(backLink).toBeTruthy();
  });

  it('should show loading spinner when no detail', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading')).toBeTruthy();
  });

  it('should return empty string from renderedBody when no detail', () => {
    expect(component.renderedBody()).toBe('');
  });
});
