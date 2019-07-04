import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireManagerComponent } from './questionnaire-manager.component';

describe('QuestionnaireManagerComponent', () => {
  let component: QuestionnaireManagerComponent;
  let fixture: ComponentFixture<QuestionnaireManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
