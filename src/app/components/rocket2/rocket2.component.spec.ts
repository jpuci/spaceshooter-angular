import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rocket2Component } from './rocket2.component';

describe('Rocket2Component', () => {
  let component: Rocket2Component;
  let fixture: ComponentFixture<Rocket2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Rocket2Component]
    });
    fixture = TestBed.createComponent(Rocket2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
