import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JetPickComponent } from './jet-pick.component';

describe('JetPickComponent', () => {
  let component: JetPickComponent;
  let fixture: ComponentFixture<JetPickComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JetPickComponent]
    });
    fixture = TestBed.createComponent(JetPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
