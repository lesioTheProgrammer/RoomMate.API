import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRoomEditComponent } from './my-room-edit.component';

describe('MyRoomEditComponent', () => {
  let component: MyRoomEditComponent;
  let fixture: ComponentFixture<MyRoomEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRoomEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRoomEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
