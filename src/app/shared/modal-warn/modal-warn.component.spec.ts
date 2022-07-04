import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWarnComponent } from './modal-warn.component';

describe('ModalWarnComponent', () => {
  let component: ModalWarnComponent;
  let fixture: ComponentFixture<ModalWarnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWarnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
