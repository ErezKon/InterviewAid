import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Clipboard } from '@angular/cdk/clipboard';
import { ChatPageComponent } from './chat-page.component';
import { MarkdownService } from '../../../core/services/markdown.service';

describe('ChatPageComponent', () => {
  let component: ChatPageComponent;
  let fixture: ComponentFixture<ChatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatPageComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MarkdownService, useValue: { render: (text: string) => text ?? '' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject ChatStore', () => {
    expect(component.chatStore).toBeTruthy();
  });

  it('should inject ModelsStore', () => {
    expect(component.modelsStore).toBeTruthy();
  });

  it('should initialize userInput as empty string', () => {
    expect(component.userInput()).toBe('');
  });

  it('should load threads and models on init', () => {
    spyOn(component.chatStore, 'loadThreads');
    spyOn(component.modelsStore, 'load');
    component.ngOnInit();
    expect(component.chatStore.loadThreads).toHaveBeenCalled();
    expect(component.modelsStore.load).toHaveBeenCalled();
  });

  it('should not send empty messages', () => {
    spyOn(component.chatStore, 'send');
    component.userInput.set('   ');
    component.sendMessage();
    expect(component.chatStore.send).not.toHaveBeenCalled();
  });

  it('should send message and clear input', () => {
    spyOn(component.chatStore, 'send');
    component.userInput.set('Hello');
    component.sendMessage();
    expect(component.userInput()).toBe('');
    expect(component.chatStore.send).toHaveBeenCalled();
  });

  it('should delegate markdown rendering to MarkdownService', () => {
    const mdService = TestBed.inject(MarkdownService);
    spyOn(mdService, 'render').and.returnValue('<p>rendered</p>');
    const result = component.renderMd('# test');
    expect(mdService.render).toHaveBeenCalledWith('# test');
    expect(result).toBe('<p>rendered</p>');
  });

  it('should copy message to clipboard', () => {
    const clipboard = TestBed.inject(Clipboard);
    spyOn(clipboard, 'copy');
    component.copyMessage('test content');
    expect(clipboard.copy).toHaveBeenCalledWith('test content');
  });

  it('should prevent default and send on Enter without Shift', () => {
    spyOn(component, 'sendMessage');
    const event = new KeyboardEvent('keydown', { key: 'Enter', shiftKey: false });
    spyOn(event, 'preventDefault');
    component.onSend(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.sendMessage).toHaveBeenCalled();
  });

  it('should not send on Shift+Enter', () => {
    spyOn(component, 'sendMessage');
    const event = new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true });
    component.onSend(event);
    expect(component.sendMessage).not.toHaveBeenCalled();
  });

  it('should render the chat container', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.chat-container')).toBeTruthy();
  });

  it('should render the thread sidebar', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.thread-sidebar')).toBeTruthy();
  });

  it('should render the composer', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.composer')).toBeTruthy();
  });
});
