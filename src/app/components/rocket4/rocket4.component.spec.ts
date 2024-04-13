import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rocket4Component } from './rocket4.component';

describe('Rocket4Component', () => {
  let component: Rocket4Component;
  let fixture: ComponentFixture<Rocket4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Rocket4Component]
    });
    fixture = TestBed.createComponent(Rocket4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
