import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentRef } from '@angular/core';
import { ProblemDetailComponent } from './problem-detail.component';
import { MarkdownService } from '../../../core/services/markdown.service';

describe('ProblemDetailComponent', () => {
  let component: ProblemDetailComponent;
  let fixture: ComponentFixture<ProblemDetailComponent>;
  let componentRef: ComponentRef<ProblemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemDetailComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MarkdownService, useValue: { render: (text: string) => text ?? '' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProblemDetailComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('slug', 'test-problem');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have slug input', () => {
    expect(component.slug()).toBe('test-problem');
  });

  it('should render back link', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const backLink = compiled.querySelector('a[routerLink="/problems"]');
    expect(backLink).toBeTruthy();
  });

  it('should show loading spinner when no detail', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading')).toBeTruthy();
  });

  it('should delegate markdown rendering to MarkdownService', () => {
    const mdService = TestBed.inject(MarkdownService);
    spyOn(mdService, 'render').and.returnValue('<p>rendered</p>');
    const result = component.renderMd('# test');
    expect(mdService.render).toHaveBeenCalledWith('# test');
    expect(result).toBe('<p>rendered</p>');
  });
});
