import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHouseworkModalComponent } from './add-housework-modal.component';

describe('AddHouseworkModalComponent', () => {
  let component: AddHouseworkModalComponent;
  let fixture: ComponentFixture<AddHouseworkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHouseworkModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHouseworkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
