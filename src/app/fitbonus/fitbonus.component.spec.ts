import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitbonusComponent } from './fitbonus.component';

describe('FitbonusComponent', () => {
  let component: FitbonusComponent;
  let fixture: ComponentFixture<FitbonusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FitbonusComponent]
    });
    fixture = TestBed.createComponent(FitbonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
