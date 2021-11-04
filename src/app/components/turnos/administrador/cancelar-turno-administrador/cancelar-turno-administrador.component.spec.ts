import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarTurnoAdministradorComponent } from './cancelar-turno-administrador.component';

describe('CancelarTurnoAdministradorComponent', () => {
  let component: CancelarTurnoAdministradorComponent;
  let fixture: ComponentFixture<CancelarTurnoAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelarTurnoAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelarTurnoAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
