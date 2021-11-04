import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTurnosAdministradorComponent } from './tabla-turnos-administrador.component';

describe('TablaTurnosAdministradorComponent', () => {
  let component: TablaTurnosAdministradorComponent;
  let fixture: ComponentFixture<TablaTurnosAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaTurnosAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTurnosAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
