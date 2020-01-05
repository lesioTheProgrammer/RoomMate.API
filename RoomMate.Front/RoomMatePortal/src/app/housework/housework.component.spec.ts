import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseworkComponent } from './housework.component';

describe('HouseworkComponent', () => {
  let component: HouseworkComponent;
  let fixture: ComponentFixture<HouseworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
