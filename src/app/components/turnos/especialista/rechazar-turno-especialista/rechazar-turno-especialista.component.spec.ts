import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazarTurnoEspecialistaComponent } from './rechazar-turno-especialista.component';

describe('RechazarTurnoEspecialistaComponent', () => {
  let component: RechazarTurnoEspecialistaComponent;
  let fixture: ComponentFixture<RechazarTurnoEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechazarTurnoEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechazarTurnoEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
