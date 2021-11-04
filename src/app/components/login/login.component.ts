import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

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

  arrPaciente : any[] = [];
  arrEspecialista : any[] = [];
  arrAdmin : any[] = [];

  constructor(private fb : FormBuilder, private auth : AuthService, private router : Router, private utilidades : UtilidadesService,private db : AngularFirestore) {
    this.coleccion = this.db.collection<any>('usuarios');
    this.usuarios = this.coleccion.valueChanges();
  }

  ngOnInit(): void {
    this.grupoDeControles = this.fb.group({
      'mail': ['', [Validators.required, Validators.email]],
      'contrasena': ['', Validators.required],
    });

    this.usuarios.subscribe((usuarios : any) => {
      this.arrAdmin = [];
      this.arrPaciente = [];
      this.arrEspecialista = [];

      for(let item of usuarios){
        if(item.tipo == 'paciente' && this.arrPaciente.length < 2){
          this.arrPaciente.push(item);
        }else if(item.tipo == 'especialista' && this.arrEspecialista.length < 2){
          this.arrEspecialista.push(item);
        }else if(item.tipo == 'admin' && this.arrAdmin.length < 2){
          this.arrAdmin.push(item);
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
          this.router.navigate(['']);
        }else if(auxUsuario?.tipo == 'especialista' && !auxUsuario?.cuentaVerificada){
          this.utilidades.mostrarToastError('Usuario no verificado', 'Un administrador debe verificar su cuenta');
          this.auth.signOut();
        }

        if(auxUsuario?.tipo == 'paciente' || auxUsuario?.tipo == 'admin') {
          this.auth.currentUser = auxUsuario;
          this.auth.isLoggedIn = true;
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
}
