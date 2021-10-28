import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-tabla-turnos-paciente',
  templateUrl: './tabla-turnos-paciente.component.html',
  styleUrls: ['./tabla-turnos-paciente.component.scss']
})
export class TablaTurnosPacienteComponent implements OnInit {

  coleccion : any;
  turnos : any;
  turnosBD : any;
  turnosValidos : any[] = [];

  constructor(private firebase : FirebaseService, private db : AngularFirestore, private auth : AuthService) { 
    this.coleccion = this.db.collection<any>('turnos');
    this.turnos = this.coleccion.valueChanges({idField: 'id'});
  }

  ngOnInit(): void {
    this.turnos.subscribe((turnos : any) => {
      this.turnosBD = turnos;
      this.validarTurnos();
    });
  }

  validarTurnos(){
    
    let index : any;
    
    for(let item of this.turnosBD){
      if(this.auth.currentUser.dni == item.dniPaciente){
        index = this.turnosValidos.indexOf(item);
        if(index == -1){
          this.turnosValidos.push(item);
        }
      }
    }
  }
}
