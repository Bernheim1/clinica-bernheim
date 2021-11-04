import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarTurnoEspecialistaComponent } from './finalizar-turno-especialista.component';

describe('FinalizarTurnoEspecialistaComponent', () => {
  let component: FinalizarTurnoEspecialistaComponent;
  let fixture: ComponentFixture<FinalizarTurnoEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizarTurnoEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarTurnoEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
