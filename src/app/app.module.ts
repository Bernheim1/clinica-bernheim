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
    PerfilComponent
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
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
