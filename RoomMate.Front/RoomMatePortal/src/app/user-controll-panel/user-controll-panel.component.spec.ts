import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserControllPanelComponent } from './user-controll-panel.component';

describe('UserControllPanelComponent', () => {
  let component: UserControllPanelComponent;
  let fixture: ComponentFixture<UserControllPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserControllPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserControllPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
