import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { Admin } from 'src/app/clases/admin';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  
  tipoUsuario : string = '';
  coleccion : any;
  especialidades : any;
  especialidadesBD : any;
  event : any;
  arrEspecialidades : any[] = [];
  captchaValido : boolean = false;
  numCaptcha : any;

  @Input() set tipo(value : any){
    this.tipoUsuario = value;

    if(this.tipoUsuario == 'paciente'){
      this.inicializarPaciente();
    }else{
      if(this.tipoUsuario == 'especialista'){
        this.inicializarEspecialista();
      }else{
        this.inicializarAdmin();
      }
    }
  } 

  public grupoDeControles !: FormGroup;

  constructor(private fb : FormBuilder, private db : AngularFirestore, private firebase : FirebaseService, private utilidades : UtilidadesService, private auth : AuthService) {
    this.grupoDeControles = this.fb.group({});
    this.coleccion = this.db.collection<any>('especialidades');
    this.especialidades = this.coleccion.valueChanges();
  }

  ngOnInit(): void {
    this.especialidades.subscribe((especialidades : any) => {
      this.especialidadesBD = especialidades;
    });
    this.generarCaptcha();
  }

  private validadorDeEspacios(control : AbstractControl) : null | object {

    let nombre : string = control.value;

    let espacios = nombre.includes(' ');

    if(espacios){
      return {validadorDeEspacios : true};
    }else{
      return null;
    }

  }

  inicializarPaciente(){
    this.grupoDeControles = this.fb.group({
      'nombre': ['', [Validators.required, this.validadorDeEspacios]],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(1), Validators.max(150)]],
      'dni': ['', [Validators.required, Validators.min(11111111), Validators.max(99999999)]],
      'obraSocial': ['', Validators.required],
      'mail': ['', [Validators.required, Validators.email]],
      'contrasena': ['', Validators.required],
      'fotoPerfil': ['', Validators.required],
      'tipo' : ['paciente']
    });
  }
  
  inicializarEspecialista(){
    this.grupoDeControles = this.fb.group({
      'nombre': ['', [Validators.required, this.validadorDeEspacios]],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(1), Validators.max(150)]],
      'dni': ['', [Validators.required, Validators.min(11111111), Validators.max(99999999)]],
      'especialidades': ['', Validators.required],
      'mail': ['', [Validators.required, Validators.email]],
      'contrasena': ['', Validators.required],
      'fotoPerfil': ['', Validators.required],
      'tipo' : ['especialista'],
      'cuentaVerificada' : [false]
    });
  }

  inicializarAdmin(){
    this.grupoDeControles = this.fb.group({
      'nombre': ['', [Validators.required, this.validadorDeEspacios]],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(1), Validators.max(150)]],
      'dni': ['', [Validators.required, Validators.min(11111111), Validators.max(99999999)]],
      'mail': ['', [Validators.required, Validators.email]],
      'contrasena': ['', Validators.required],
      'fotoPerfil': ['', Validators.required],
      'tipo' : ['admin']
    });
  }

  agregarUsuario(){

    let mail : any = this.grupoDeControles.get('mail')?.value;
    let password : any = this.grupoDeControles.get('contrasena')?.value;

    this.auth.register(mail, password).then((data : any) => {
      this.auth.enviarEmail();

      if(this.tipoUsuario == 'paciente'){
        let paciente : Paciente = this.grupoDeControles.getRawValue();
        this.subirPaciente(paciente);
      }else{
        if(this.tipoUsuario == 'especialista'){
          let especialista : Especialista = this.grupoDeControles.getRawValue();
          especialista.especialidades = this.arrEspecialidades;
          this.agregarEspecialidad(especialista.especialidades);
          this.subirEspecialista(especialista);
        }else{
          let admin : Admin = this.grupoDeControles.getRawValue();
          this.subirAdmin(admin);
        }
      }
      this.grupoDeControles.reset();
    }).catch((error) => {
      
      if(error.code == 'auth/weak-password'){

        this.utilidades.mostrarToastError('Constraseña invalida', 'La contraseña tiene que tener al menos 6 caracteres');

      }else if(error.code == 'auth/email-already-in-use'){

        this.utilidades.mostrarToastError('Email ya en uso', 'El email ingresado ya fue utilizado');
        
      }
    });
    
  }

  async agregarEspecialidad(especialidades : any){
    
    let flag : boolean = false;

    for(let especialidad of especialidades){

      flag = false;

      for(let item of this.especialidadesBD){
        if(item == especialidad){
          flag = true;
        }
      }
      
      if(!flag){
        await this.firebase.subirEspecialidad(especialidad);
      }
    }

  }

  sumarEspecialidades(){
    let aux = (<HTMLInputElement> document.getElementById('especialidad')).value
    let flag : boolean = false;
    
    for(let item of this.arrEspecialidades){
      if(item == aux){
        flag = true;
      }
    }

    if(!flag){
      this.arrEspecialidades.push(aux);
      console.log(this.arrEspecialidades)
    }

    (<HTMLInputElement> document.getElementById('especialidad')).value = ''
  }

  uploadFile(event : Event) {
    this.event = event;
  }

  async subirPaciente( paciente : Paciente) {

    if(this.event.target.files.length == 2){
      let date = Date.now();

      let file = this.event.target.files[0];
      let file2 = this.event.target.files[1];
  
      let filePath = `fotos/${paciente.nombre}-${paciente.apellido}-${date}`
      let filePath2 = `fotos/${paciente.nombre}-${paciente.apellido}-${date}-2`;
  
      let fileRef = this.firebase.getFileRef(filePath);
      let fileRef2 = this.firebase.getFileRef(filePath2);
  
      await this.firebase.uploadFile(filePath, file);
      await this.firebase.uploadFile(filePath2, file2);
  
      fileRef.getDownloadURL().subscribe((data : any) => {
        paciente.fotoPerfil = data;
  
        fileRef2.getDownloadURL().subscribe((data : any) => {
          paciente.fotoPerfil2 = data;
          this.firebase.subirPaciente(paciente);
        });
  
      });
    }else{
      this.utilidades.mostrarToastError('Error en ingreso de fotos', 'Cantidad de fotos ingresada invalida, deben ser 2');
    }

  }

  async subirEspecialista( especialista : Especialista) {
    let date = Date.now();
    let file = this.event.target.files[0];
    let filePath = `fotos/${especialista.nombre}-${especialista.apellido}-${date}`;
    let fileRef = this.firebase.getFileRef(filePath);
    await this.firebase.uploadFile(filePath, file);

    fileRef.getDownloadURL().subscribe((data : any) => {
      especialista.fotoPerfil = data;
      this.firebase.subirEspecialista(especialista);
    });
  }

  async subirAdmin( admin : Admin) {
    let date = Date.now();
    let file = this.event.target.files[0];
    let filePath = `fotos/${admin.nombre}-${admin.apellido}-${date}`;
    let fileRef = this.firebase.getFileRef(filePath);
    await this.firebase.uploadFile(filePath, file);

    fileRef.getDownloadURL().subscribe((data : any) => {
      admin.fotoPerfil = data;
      this.firebase.subirAdmin(admin);
    });
  }

  generarCaptcha(){
    let aux = Math.round(Math.random() * (9999 - 1111));
    this.numCaptcha = aux;
  }

  validarCaptcha(event : any){
    let aux : any = event.target.value;

    if(aux == this.numCaptcha){
      this.captchaValido = true;
    }else{
      this.captchaValido = false;
    }
  }


}
