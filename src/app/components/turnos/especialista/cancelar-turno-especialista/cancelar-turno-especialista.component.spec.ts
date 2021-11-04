import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarTurnoEspecialistaComponent } from './cancelar-turno-especialista.component';

describe('CancelarTurnoEspecialistaComponent', () => {
  let component: CancelarTurnoEspecialistaComponent;
  let fixture: ComponentFixture<CancelarTurnoEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelarTurnoEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelarTurnoEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
