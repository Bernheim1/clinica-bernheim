import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoUsuarioPipe } from 'src/app/pipes/tipo-usuario.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public grupoDeControles !: FormGroup;
  coleccion : any;
  usuarios : any;
  usuariosBD : any;

  arrUsuarios : any[] = [];


  constructor(private fb : FormBuilder, private auth : AuthService, private router : Router, private utilidades : UtilidadesService, private db : AngularFirestore, public tipoUsuarioPipe : TipoUsuarioPipe, public firebase : FirebaseService, private datePipe : DatePipe) {
    this.coleccion = this.db.collection<any>('usuarios');
    this.usuarios = this.coleccion.valueChanges();
  }

  ngOnInit(): void {
    this.grupoDeControles = this.fb.group({
      'mail': ['', [Validators.required, Validators.email]],
      'contrasena': ['', Validators.required],
    });

    this.usuarios.subscribe((usuarios : any) => {

      let contPaciente = 0;
      let contEspecialista = 0;
      let contAdmin = 0;

      this.arrUsuarios = [];

      for(let item of usuarios){
        if(item.tipo == 'paciente' && contPaciente < 2){
          this.arrUsuarios.push(item);
          contPaciente++;
        }else if(item.tipo == 'especialista' && contEspecialista < 2){
          this.arrUsuarios.push(item);
          contEspecialista++;
        }else if(item.tipo == 'admin' && contAdmin < 2){
          this.arrUsuarios.push(item);
          contAdmin++;
        }
      }

      this.usuariosBD = usuarios;
    });
  }

  ingresar(){

    let mail : any =this.grupoDeControles.get('mail')?.value;
    let contrasena : any =this.grupoDeControles.get('contrasena')?.value;


    this.auth.login(mail,contrasena).then((data : any) => {

      let auxUsuario : any;

      for(let item of this.usuariosBD){
        console.log(item);
        if(item.mail == mail && item.contrasena == contrasena){
          auxUsuario = item;
        }
      }

      if(data.user._delegate.emailVerified){

        if(auxUsuario?.tipo == 'especialista' && auxUsuario?.cuentaVerificada){
          this.auth.currentUser = auxUsuario;
          this.auth.isLoggedIn = true;
          this.enviarLog(this.datePipe.transform(Date.now(),'M/d/yy h:mm a'), `${auxUsuario.nombre + ' ' + auxUsuario.apellido}`);
          this.router.navigate(['']);
          
        }else if(auxUsuario?.tipo == 'especialista' && !auxUsuario?.cuentaVerificada){
          this.utilidades.mostrarToastError('Usuario no verificado', 'Un administrador debe verificar su cuenta');
          this.auth.signOut();
        }

        if(auxUsuario?.tipo == 'paciente' || auxUsuario?.tipo == 'admin') {
          this.auth.currentUser = auxUsuario;
          this.auth.isLoggedIn = true;
          this.enviarLog(this.datePipe.transform(Date.now(),'M/d/yy h:mm a'), `${auxUsuario.nombre + ' ' + auxUsuario.apellido}`);
          this.router.navigate(['']);
        }

      }else{
        this.utilidades.mostrarToastError('Email no verificado', 'Verifique su email para poder ingresar');
        this.auth.signOut();
      }

    }).catch((error : any) => {
      if(error.code == 'auth/invalid-email'){

        this.utilidades.mostrarToastError('Email invalido', 'El email ingresado es invalido, por favor vuelva a ingresarlo!');

      }else if(error.code == 'auth/user-not-found' || error.code === 'auth/wrong-password'){

        this.utilidades.mostrarToastError('Credenciales Invalidas', 'Usuario o clave invalidos, vuelva a ingresar los datos');

      }else{
        console.log(error);
      }
    })
  }

  loginValido(item : any) {

    this.grupoDeControles.get('mail')?.setValue(item.mail);
    this.grupoDeControles.get('contrasena')?.setValue(item.contrasena);

    this.ingresar();
  }

  enviarLog(fecha : any, usuario : any){
    return this.firebase.cargarLog({
      fecha: fecha,
      usuario: usuario
    }).then((respuesta) => {
      console.log("Log de ingreso guardado: ", respuesta.id);
    }).catch((error) => {
      console.error("Error guardando el log: ", error);
  });
  }
}
