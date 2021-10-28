import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  arrHorarios : any[] = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', 
                          '13:00', '13:30', '14:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'];
  arrDias : any[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  arrHorariosEspecialista : any[] = [];    
  arrDiasEspecialista : any[] = [];                  
  mostrarMisHorarios : boolean = false;

  coleccion : any;
  usuarios : any;
  usuario : any;

  constructor(public auth : AuthService, private utilidades : UtilidadesService, private db : AngularFirestore, private firebase : FirebaseService) { 
    this.coleccion = this.db.collection<any>('usuarios');
    this.usuarios = this.coleccion.valueChanges({idField: 'id'});
  }

  ngOnInit(): void {
    this.usuarios.subscribe((usuarios : any) => {

      for(let item of usuarios){
        if(item.dni == this.auth.currentUser.dni){
          this.usuario = item;
        }
      }
    });
  }

  seleccionHorario(opcion : any) {

    let flag : boolean = false;
    let pos : any;

    if(this.arrHorariosEspecialista.length > 0) {

      for(let i = 0; i < this.arrHorariosEspecialista.length; i++) {

        if(opcion === this.arrHorariosEspecialista[i]){
          flag = true;
          pos = i;
          break;
        }
      }

      if(flag === true){
        this.arrHorariosEspecialista = this.arrHorariosEspecialista.filter((i) => i != opcion);
      }else{
        this.arrHorariosEspecialista.push(opcion);
      }
    }else{
      this.arrHorariosEspecialista.push(opcion);
    }

    console.log(this.arrHorariosEspecialista)
  }

  seleccionDia(opcion : any) {

    let flag : boolean = false;
    let pos : any;

    if(this.arrDiasEspecialista.length > 0) {

      for(let i = 0; i < this.arrDiasEspecialista.length; i++) {

        if(opcion === this.arrDiasEspecialista[i]){
          flag = true;
          pos = i;
          break;
        }
      }

      if(flag === true){
        this.arrDiasEspecialista = this.arrDiasEspecialista.filter((i) => i != opcion);
      }else{
        this.arrDiasEspecialista.push(opcion);
      }
    }else{
      this.arrDiasEspecialista.push(opcion);
    }

    console.log(this.arrDiasEspecialista)
  }

  misHorarios(){
    this.mostrarMisHorarios = !this.mostrarMisHorarios;
  }

  enviarHorarios(){

    if(this.arrHorariosEspecialista.length > 0){
      let aux : any;
      aux = this.usuario;
      
      aux.horarios = this.arrHorariosEspecialista;
      aux.dias = this.arrDiasEspecialista;
      this.firebase.modificarUsuario(aux, this.usuario.id);
      this.utilidades.mostrarToastSuccess('Horarios seleccionados correctamente', 'Los horarios han sido asignados');
      this.arrHorariosEspecialista = [];
      this.arrDiasEspecialista = [];

    }else{
      this.utilidades.mostrarToastError('Horarios sin seleccionar', 'Debe seleccionar al menos un horario');
    }
  }

}
