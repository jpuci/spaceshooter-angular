import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rocket3Component } from './rocket3.component';

describe('Rocket3Component', () => {
  let component: Rocket3Component;
  let fixture: ComponentFixture<Rocket3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Rocket3Component]
    });
    fixture = TestBed.createComponent(Rocket3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
