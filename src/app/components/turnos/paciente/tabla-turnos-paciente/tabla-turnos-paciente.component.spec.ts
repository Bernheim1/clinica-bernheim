import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTurnosPacienteComponent } from './tabla-turnos-paciente.component';

describe('TablaTurnosPacienteComponent', () => {
  let component: TablaTurnosPacienteComponent;
  let fixture: ComponentFixture<TablaTurnosPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaTurnosPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTurnosPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
