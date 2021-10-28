import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaTurnoComponent } from 'src/app/components/turnos/alta/alta-turno/alta-turno.component';
import { TurnosPacienteComponent } from 'src/app/components/turnos/paciente/turnos-paciente/turnos-paciente.component';

const routes: Routes = [
  {path: 'alta', component: AltaTurnoComponent},
  {path: 'paciente', component: TurnosPacienteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
