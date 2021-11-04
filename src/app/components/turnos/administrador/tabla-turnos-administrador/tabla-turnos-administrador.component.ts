import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-tabla-turnos-administrador',
  templateUrl: './tabla-turnos-administrador.component.html',
  styleUrls: ['./tabla-turnos-administrador.component.scss']
})
export class TablaTurnosAdministradorComponent implements OnInit {

  @Output() cancelar = new EventEmitter();

  coleccion : any;
  turnos : any;
  turnosBD : any;
  turnosValidos : any[] = [];
  turnosAMostrar : any[] = [];

  arrEspecialistasValidos : any[] = [];
  arrEspecialidadesValidas : any[] = [];

  constructor(private firebase : FirebaseService, private db : AngularFirestore, private auth : AuthService, private utilidades : UtilidadesService) { 
    this.coleccion = this.db.collection<any>('turnos');
    this.turnos = this.coleccion.valueChanges({idField: 'id'});
  }

  ngOnInit(): void {
    this.turnos.subscribe((turnos : any) => {
      this.turnosBD = turnos;
      this.validarTurnos();
      this.validarEspecialistas();
      this.validarEspecialidades();
    });

  }

  validarTurnos(){

    this.turnosValidos = [];
    
    for(let item of this.turnosBD){

      this.turnosValidos.push(item);
      
    }
    this.turnosAMostrar = this.turnosValidos;
  }

  validarEspecialistas(){

    let index : any;
    let especialista : any;
    
    for(let item of this.turnosValidos){
      especialista = item.especialista
      index = this.arrEspecialistasValidos.indexOf(especialista);
      if(index == -1){
        this.arrEspecialistasValidos.push(especialista);
      }
    }
  }

  validarEspecialidades(){
    
    let index : any;
    let especialidad : any;
    
    for(let item of this.turnosValidos){
      especialidad = item.especialidad
      index = this.arrEspecialidadesValidas.indexOf(especialidad);
      if(index == -1){
        this.arrEspecialidadesValidas.push(especialidad);
      }
    }
  }

  cambiarEspecialista(opcion : any){

    this.turnosAMostrar = [];
    
    if(opcion != 'mostrarTodos'){

      for(let item of this.turnosValidos){
        if(item.especialista == opcion){
          this.turnosAMostrar.push(item);
        }
      }
    }else{
      this.turnosAMostrar = this.turnosValidos;
    }

  }

  cambiarEspecialidad(opcion : any){

    this.turnosAMostrar = [];

    for(let item of this.turnosValidos){
      if(item.especialidad == opcion){
        this.turnosAMostrar.push(item);
      }
    }

  }

  cancelarTurno(item : any){
    this.cancelar.emit(item);
  }

}
