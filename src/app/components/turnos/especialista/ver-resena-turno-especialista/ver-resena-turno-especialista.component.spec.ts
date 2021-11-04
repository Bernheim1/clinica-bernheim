import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerResenaTurnoEspecialistaComponent } from './ver-resena-turno-especialista.component';

describe('VerResenaTurnoEspecialistaComponent', () => {
  let component: VerResenaTurnoEspecialistaComponent;
  let fixture: ComponentFixture<VerResenaTurnoEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerResenaTurnoEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerResenaTurnoEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
