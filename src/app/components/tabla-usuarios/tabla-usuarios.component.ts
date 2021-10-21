import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss']
})
export class TablaUsuariosComponent implements OnInit {

  tipo : any = 'paciente';
  coleccion : any;
  usuarios : any;
  
  arrAdmin : any[] = [];
  arrPaciente : any[] = [];
  arrEspecialista : any[] = [];
  arrAux : any[] = [];

  constructor(private db : AngularFirestore, private firebase : FirebaseService) { 
    this.coleccion = this.db.collection<any>('usuarios');
    this.usuarios = this.coleccion.valueChanges({idField: 'id'});
  }

  ngOnInit(): void {
    this.usuarios.subscribe((usuarios : any) => {
      this.arrAdmin = [];
      this.arrPaciente = [];
      this.arrEspecialista = [];

      for(let item of usuarios){
        if(item.tipo == 'paciente'){
          this.arrPaciente.push(item);
        }else if(item.tipo == 'especialista'){
          this.arrEspecialista.push(item);
        }else{
          this.arrAdmin.push(item);
        }
      }

      this.arrAux = this.arrPaciente;
    });
  }

  cambiarVista(opcion : any){
    switch(opcion){
      case 'paciente':
          this.tipo = 'paciente';
          this.arrAux = this.arrPaciente;
        break;
      case 'especialista':
        this.tipo = 'especialista';
        this.arrAux = this.arrEspecialista;
        break;
      case 'admin':
        this.tipo = 'admin';
        this.arrAux = this.arrAdmin;
        break;
    }
  }

  verificarEspecialista(especialista : any){
    especialista.cuentaVerificada = !especialista.cuentaVerificada;
    this.firebase.modificarUsuario(especialista, especialista.id);
  }
}
