import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-tabla-turnos-paciente',
  templateUrl: './tabla-turnos-paciente.component.html',
  styleUrls: ['./tabla-turnos-paciente.component.scss']
})
export class TablaTurnosPacienteComponent implements OnInit {

  @Output() cancelar = new EventEmitter();
  @Output() resena = new EventEmitter();
  @Output() encuesta = new EventEmitter();
  @Output() atencion = new EventEmitter();

  coleccion : any;
  turnos : any;
  turnosBD : any;
  turnosValidos : any[] = [];
  turnosAMostrar : any[] = [];

  arrEspecialistasValidos : any[] = [];
  arrEspecialidadesValidas : any[] = [];

  constructor(private firebase : FirebaseService, private db : AngularFirestore, private auth : AuthService) { 
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
      if(this.auth.currentUser?.dni == item.dniPaciente){

          this.turnosValidos.push(item);

      }
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

  verResena(item : any){
    this.resena.emit(item);
  }

  completarEncuesta(item : any){
    this.encuesta.emit(item);
  }

  calificarAtencion(item : any){
    this.atencion.emit(item);
  }

  validarBusqueda(){

    console.log('a')

    let busqueda = (<HTMLInputElement> document.getElementById('busqueda')).value.toString();
    let arrAux : any[] = [];
    let index : any;

    console.log(busqueda);
    
    if(busqueda != ''){

      busqueda = busqueda.toLowerCase();
      
      for(let item of this.turnosValidos){

        if(item.dniPaciente.toString().includes(busqueda)){
          index = arrAux.indexOf(item);
          if(index == -1){
            arrAux.push(item)
          }
        }

        if(item.dniEspecialista.toString().includes(busqueda)){
          index = arrAux.indexOf(item);
          if(index == -1){
            arrAux.push(item)
          }
        }

        if(item.dia.includes(busqueda)){
          index = arrAux.indexOf(item);
          if(index == -1){
            arrAux.push(item)
          }
        }

        if(item.hora.includes(busqueda)){
          index = arrAux.indexOf(item);
          if(index == -1){
            arrAux.push(item)
          }
        }

        if(item.especialidad.toLowerCase().includes(busqueda)){
          index = arrAux.indexOf(item);
          if(index == -1){
            arrAux.push(item)
          }
        }

        if(item.especialista.toLowerCase().includes(busqueda)){
          index = arrAux.indexOf(item);
          if(index == -1){
            arrAux.push(item)
          }
        }

        if(item.paciente.toLowerCase().includes(busqueda)){
          index = arrAux.indexOf(item);
          if(index == -1){
            arrAux.push(item)
          }
        }
      }

      this.turnosAMostrar = arrAux;
    }

  }
}
