import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common'



//FIREBASE
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule} from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { SeleccionRegistroComponent } from './components/seleccion-registro/seleccion-registro.component';
import { SeccionUsuariosComponent } from './components/seccion-usuarios/seccion-usuarios.component';
import { TablaUsuariosComponent} from './components/tabla-usuarios/tabla-usuarios.component';
import { TurnosPacienteComponent } from './components/turnos/paciente/turnos-paciente/turnos-paciente.component';
import { TablaTurnosPacienteComponent } from './components/turnos/paciente/tabla-turnos-paciente/tabla-turnos-paciente.component';
import { AltaTurnoComponent } from './components/turnos/alta/alta-turno/alta-turno.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CancelarTurnoComponent } from './components/turnos/paciente/cancelar-turno/cancelar-turno.component';
import { VerResenaComponent } from './components/turnos/paciente/ver-resena/ver-resena.component';
import { CompletarEncuestaComponent } from './components/turnos/paciente/completar-encuesta/completar-encuesta.component';
import { CalificarAtencionComponent } from './components/turnos/paciente/calificar-atencion/calificar-atencion.component';
import { TurnosEspecialistaComponent } from './components/turnos/especialista/turnos-especialista/turnos-especialista.component';
import { CancelarTurnoEspecialistaComponent } from './components/turnos/especialista/cancelar-turno-especialista/cancelar-turno-especialista.component';
import { RechazarTurnoEspecialistaComponent } from './components/turnos/especialista/rechazar-turno-especialista/rechazar-turno-especialista.component';
import { FinalizarTurnoEspecialistaComponent } from './components/turnos/especialista/finalizar-turno-especialista/finalizar-turno-especialista.component';
import { VerResenaTurnoEspecialistaComponent } from './components/turnos/especialista/ver-resena-turno-especialista/ver-resena-turno-especialista.component';
import { TablaTurnosEspecialistaComponent } from './components/turnos/especialista/tabla-turnos-especialista/tabla-turnos-especialista.component';
import { TablaTurnosAdministradorComponent } from './components/turnos/administrador/tabla-turnos-administrador/tabla-turnos-administrador.component';
import { CancelarTurnoAdministradorComponent } from './components/turnos/administrador/cancelar-turno-administrador/cancelar-turno-administrador.component';
import { TurnosAdministradorComponent } from './components/turnos/administrador/turnos-administrador/turnos-administrador.component';
import { SeccionPacientesComponent } from './components/seccion-pacientes/seccion-pacientes.component';
import { EstadoTurnoPipe } from './pipes/estado-turno.pipe';
import { TipoUsuarioPipe } from './pipes/tipo-usuario.pipe';
import { EstadoTurnoDirective } from './directives/estado-turno.directive';
import { BotonBienvenidaDirective } from './directives/boton-bienvenida.directive';
import { BotonHistoriaClinicaDirective } from './directives/boton-historia-clinica.directive';
import { ChartsModule } from 'ng2-charts';
import { GraficosAdminComponent } from './components/graficos-admin/graficos-admin.component';
import { LogsUsuariosComponent } from './components/logs-usuarios/logs-usuarios.component';
import { EstadoHistoriaClinicaPipe } from './pipes/estado-historia-clinica.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    RegistroComponent,
    LoginComponent,
    SeleccionRegistroComponent,
    SeccionUsuariosComponent,
    TablaUsuariosComponent,
    TurnosPacienteComponent,
    TablaTurnosPacienteComponent,
    AltaTurnoComponent,
    PerfilComponent,
    CancelarTurnoComponent,
    VerResenaComponent,
    CompletarEncuestaComponent,
    CalificarAtencionComponent,
    TurnosEspecialistaComponent,
    CancelarTurnoEspecialistaComponent,
    RechazarTurnoEspecialistaComponent,
    FinalizarTurnoEspecialistaComponent,
    VerResenaTurnoEspecialistaComponent,
    TablaTurnosEspecialistaComponent,
    TablaTurnosAdministradorComponent,
    CancelarTurnoAdministradorComponent,
    TurnosAdministradorComponent,
    SeccionPacientesComponent,
    EstadoTurnoPipe,
    TipoUsuarioPipe,
    EstadoTurnoDirective,
    BotonBienvenidaDirective,
    BotonHistoriaClinicaDirective,
    GraficosAdminComponent,
    LogsUsuariosComponent,
    EstadoHistoriaClinicaPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ChartsModule,
  ],
  providers: [DatePipe, EstadoTurnoPipe, TipoUsuarioPipe, EstadoHistoriaClinicaPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
