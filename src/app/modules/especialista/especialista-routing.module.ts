import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeccionPacientesComponent } from 'src/app/components/seccion-pacientes/seccion-pacientes.component';

const routes: Routes = [
  {path: 'seccionPacientes', component: SeccionPacientesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialistaRoutingModule { }
