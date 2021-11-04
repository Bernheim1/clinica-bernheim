import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-seccion-pacientes',
  templateUrl: './seccion-pacientes.component.html',
  styleUrls: ['./seccion-pacientes.component.scss']
})
export class SeccionPacientesComponent implements OnInit {

  coleccion : any;
  usuarios : any;
  usuariosBD : any;

  turnos : any;
  turnosBD : any;


  mostrarPacientes : boolean = true;
  mostrarHistoriaClinica : boolean = false;

  pacientesValidos : any[] = [];
  pacienteSeleccionado : any;

  constructor(private db : AngularFirestore, public auth : AuthService) { 
    this.coleccion = this.db.collection<any>('usuarios');
    this.usuarios = this.coleccion.valueChanges({idField: 'id'});

    this.coleccion = this.db.collection<any>('turnos');
    this.turnos = this.coleccion.valueChanges({idField: 'id'});
  }

  ngOnInit(): void {
    this.usuarios.subscribe((usuarios : any) => {
      this.usuariosBD = usuarios;
    });

    this.turnos.subscribe((turnos : any) => {
      this.turnosBD = turnos;
      this.validarPacientes()
    });

  }

  seleccionarPaciente(item : any){
    this.pacienteSeleccionado = item;
    this.mostrarPacientes = false;
    this.mostrarHistoriaClinica = true;
  }

  validarPacientes(){

    let dniPacientes : any[] = [];
    let arrAux : any[] = [];
    let index : any;

      for(let turno of this.turnosBD){
        
        if(turno.dniEspecialista == this.auth.currentUser.dni){
          
          index = dniPacientes.indexOf(turno.dniPaciente);

          if(index == -1){
            
            dniPacientes.push(turno.dniPaciente);

          }

        }

      }

      for(let item of this.usuariosBD){

          if(dniPacientes.includes(item.dni)){
              arrAux.push(item);
          }

      }

      console.log(arrAux);
      this.pacientesValidos = arrAux;
  }

  cerrarHistoriaClinica(){
    this.mostrarHistoriaClinica = false;
    this.mostrarPacientes = true;
  }
}
