import { TestBed, async } from '@angular/core/testing';
import { DiagramComponent } from './diagram.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DiagramComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DiagramComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'bpmn-camunda-example'`, () => {
    const fixture = TestBed.createComponent(DiagramComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('bpmn-camunda-example');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(DiagramComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('bpmn-camunda-example app is running!');
  });
});