import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { LoginComponent } from './components/login/login.component';
import { SeccionUsuariosComponent } from './components/seccion-usuarios/seccion-usuarios.component';
import { SeleccionRegistroComponent } from './components/seleccion-registro/seleccion-registro.component';

const routes: Routes = [
  {path: '', component: BienvenidaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: SeleccionRegistroComponent},
  {path: 'seccionUsuarios', component: SeccionUsuariosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
