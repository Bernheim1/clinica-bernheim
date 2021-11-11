import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsUsuariosComponent } from './logs-usuarios.component';

describe('LogsUsuariosComponent', () => {
  let component: LogsUsuariosComponent;
  let fixture: ComponentFixture<LogsUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
