import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { EstadoHistoriaClinicaPipe } from 'src/app/pipes/estado-historia-clinica.pipe';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss']
})
export class TablaUsuariosComponent implements OnInit {

  tipo : any = 'paciente';
  coleccion : any;
  usuarios : any;
  usuariosBD : any;
  
  arrAdmin : any[] = [];
  arrPaciente : any[] = [];
  arrEspecialista : any[] = [];
  arrAux : any[] = [];

  mostrarUsuarios : boolean = true;
  mostrarHistoriaClinica : boolean = false;
  pacienteSeleccionado : any;

  constructor(private db : AngularFirestore, private firebase : FirebaseService, private utilidades : UtilidadesService, public estadoHistoriaClinica : EstadoHistoriaClinicaPipe) { 
    this.coleccion = this.db.collection<any>('usuarios');
    this.usuarios = this.coleccion.valueChanges({idField: 'id'});
  }

  ngOnInit(): void {
    this.usuarios.subscribe((usuarios : any) => {
      this.usuariosBD = usuarios;
      this.validarUsuarios();
    });
  }

  validarUsuarios(){

    if(this.arrAux.length == 0){
      for(let item of this.usuariosBD){
        if(item.tipo == 'paciente'){
          this.arrPaciente.push(item);
        }else if(item.tipo == 'especialista'){
          this.arrEspecialista.push(item);
        }else{
          this.arrAdmin.push(item);
        }
      }

      this.arrAux = this.arrPaciente;
    }else{
      let arrPacienteAux : any[] = [];
      let arrEspecialistaAux : any[] = [];
      let arrAdminAux : any[] = [];

      for(let item of this.usuariosBD){
        if(item.tipo == 'paciente'){
          arrPacienteAux.push(item);
        }else if(item.tipo == 'especialista'){
          arrEspecialistaAux.push(item);
        }else{
          arrAdminAux.push(item);
        }
      }

      if(this.arrPaciente != arrPacienteAux){
        this.arrPaciente = arrPacienteAux;
      }
      
      if(this.arrEspecialista != arrEspecialistaAux){
        this.arrEspecialista = arrEspecialistaAux;
      }

      if(this.arrAdmin != arrAdminAux){
        this.arrAdmin = arrAdminAux;
      }
    }



    
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

  seleccionarPaciente(item : any){
    this.pacienteSeleccionado = item;
    this.mostrarUsuarios = false;
    this.mostrarHistoriaClinica = true;
  }

  cerrarHistoriaClinica(){
    this.mostrarHistoriaClinica = false;
    this.mostrarUsuarios = true;
  }

  descargarExcel(){

    let arrTodos : any[] = [];

    for(let item of this.arrPaciente){
      arrTodos.push(item);
    }

    for(let item of this.arrEspecialista){
      arrTodos.push(item);
    }    

    for(let item of this.arrAdmin){
      arrTodos.push(item);
    }


    let workbook = new Workbook();

    let worksheet = workbook.addWorksheet("Usuarios");

    let header = ["Nombre", "Apellido", "DNI", "Edad", "Correo", "Perfil"];
    let headerRow = worksheet.addRow(header);

    for (let item of arrTodos) {
      let auxRow = [item.nombre ,  item.apellido , item.dni , item.edad , item.mail , item.tipo ];

      worksheet.addRow(auxRow);
    }

    let fileName = "UsuariosClinica";

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fileName + '.xlsx');
      this.utilidades.mostrarToastSuccess('Archivo descargado', 'El archivo excel con todos los usuarios fue descargado');
    });
  }

}
