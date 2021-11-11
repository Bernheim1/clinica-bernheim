import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EstadoTurnoPipe } from 'src/app/pipes/estado-turno.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-tabla-turnos-especialista',
  templateUrl: './tabla-turnos-especialista.component.html',
  styleUrls: ['./tabla-turnos-especialista.component.scss']
})
export class TablaTurnosEspecialistaComponent implements OnInit {

  @Output() cancelar = new EventEmitter();
  @Output() resena = new EventEmitter();
  @Output() rechazar = new EventEmitter();
  @Output() finalizar = new EventEmitter();

  coleccion : any;
  turnos : any;
  turnosBD : any;
  turnosValidos : any[] = [];
  turnosAMostrar : any[] = [];

  arrPacientesValidos : any[] = [];
  arrEspecialidadesValidas : any[] = [];

  constructor(private firebase : FirebaseService, private db : AngularFirestore, private auth : AuthService, private utilidades : UtilidadesService, public estadoTurnoPipe : EstadoTurnoPipe) { 
    this.coleccion = this.db.collection<any>('turnos');
    this.turnos = this.coleccion.valueChanges({idField: 'id'});
  }

  ngOnInit(): void {
    this.turnos.subscribe((turnos : any) => {
      this.turnosBD = turnos;
      this.validarTurnos();
      this.validarPacientes();
      this.validarEspecialidades();
    });

  }

  validarTurnos(){

    this.turnosValidos = [];
    
    for(let item of this.turnosBD){
      if(this.auth.currentUser?.dni == item.dniEspecialista){

          this.turnosValidos.push(item);

      }
    }
    this.turnosAMostrar = this.turnosValidos;
  }

  validarPacientes(){

    let index : any;
    let especialista : any;
    
    for(let item of this.turnosValidos){
      especialista = item.paciente
      index = this.arrPacientesValidos.indexOf(especialista);
      if(index == -1){
        this.arrPacientesValidos.push(especialista);
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

  cambiarPaciente(opcion : any){

    this.turnosAMostrar = [];
    
    if(opcion != 'mostrarTodos'){

      for(let item of this.turnosValidos){
        if(item.paciente == opcion){
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

  aceptarTurno(item : any){
    item.aceptado = true;
    this.firebase.modificarTurno(item, item.id);
    this.utilidades.mostrarToastSuccess('Turno aceptado', 'El turno ha sido aceptado')
  }

  rechazarTurno(item : any){
    this.rechazar.emit(item);
  }

  finalizarTurno(item : any){
    this.finalizar.emit(item);
  }

  validarBusqueda(){

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
        
        if(item.historiaClinica != null){
          if(item.historiaClinica.altura.toString().includes(busqueda)){
            index = arrAux.indexOf(item);
            if(index == -1){
              arrAux.push(item)
            }
          }
  
          if(item.historiaClinica.peso.toString().includes(busqueda)){
            index = arrAux.indexOf(item);
            if(index == -1){
              arrAux.push(item)
            }
          }
  
          if(item.historiaClinica.temperatura.toString().includes(busqueda)){
            index = arrAux.indexOf(item);
            if(index == -1){
              arrAux.push(item)
            }
          }
  
          if(item.historiaClinica.presion.toString().includes(busqueda)){
            index = arrAux.indexOf(item);
            if(index == -1){
              arrAux.push(item)
            }
          }
  
          if(item.historiaClinica.claveValor != null){
            for(let claveValor of item.historiaClinica.claveValor){
              if(claveValor.clave.toLowerCase().includes(busqueda) || claveValor.valor.toString().includes(busqueda)){
                index = arrAux.indexOf(item);
                if(index == -1){
                  arrAux.push(item)
                }
              }
            }
          }
        }


      }

      this.turnosAMostrar = arrAux;
    }

  }

}
