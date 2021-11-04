import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnosAdministradorComponent } from 'src/app/components/turnos/administrador/turnos-administrador/turnos-administrador.component';
import { AltaTurnoComponent } from 'src/app/components/turnos/alta/alta-turno/alta-turno.component';
import { TurnosEspecialistaComponent } from 'src/app/components/turnos/especialista/turnos-especialista/turnos-especialista.component';
import { TurnosPacienteComponent } from 'src/app/components/turnos/paciente/turnos-paciente/turnos-paciente.component';

const routes: Routes = [
  {path: 'alta', component: AltaTurnoComponent},
  {path: 'paciente', component: TurnosPacienteComponent},
  {path: 'especialista', component: TurnosEspecialistaComponent},
  {path: 'admin', component: TurnosAdministradorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
