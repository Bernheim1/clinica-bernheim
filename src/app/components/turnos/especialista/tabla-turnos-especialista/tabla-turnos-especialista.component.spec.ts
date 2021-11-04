import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTurnosEspecialistaComponent } from './tabla-turnos-especialista.component';

describe('TablaTurnosEspecialistaComponent', () => {
  let component: TablaTurnosEspecialistaComponent;
  let fixture: ComponentFixture<TablaTurnosEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaTurnosEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTurnosEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
