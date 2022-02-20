import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarAtivosComponent } from './cadastrar-ativos.component';

describe('CadastrarAtivosComponent', () => {
  let component: CadastrarAtivosComponent;
  let fixture: ComponentFixture<CadastrarAtivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarAtivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarAtivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
