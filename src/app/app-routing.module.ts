import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SeleccionRegistroComponent } from './components/seleccion-registro/seleccion-registro.component';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: BienvenidaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: SeleccionRegistroComponent},
  {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
  {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthAdminGuard]},
  {path: 'turnos', loadChildren: () => import('./modules/turnos/turnos.module').then(m => m.TurnosModule), canActivate: [AuthGuard]},
  {path: 'especialista', loadChildren: () => import('./modules/especialista/especialista.module').then(m => m.EspecialistaModule), canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
