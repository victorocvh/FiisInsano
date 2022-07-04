import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewativoComponent } from './modal-newativo.component';

describe('ModalNewativoComponent', () => {
  let component: ModalNewativoComponent;
  let fixture: ComponentFixture<ModalNewativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNewativoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
