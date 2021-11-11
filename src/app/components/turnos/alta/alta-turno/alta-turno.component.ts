import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DatePipe } from '@angular/common';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.scss']
})
export class AltaTurnoComponent implements OnInit {

  coleccion : any;
  especialidades : any;
  especialidadesBD : any;
  especialidadSeleccionada : any;

  usuarios : any;
  usuariosBD : any;
  arrEspecialistas : any[] = [];
  arrEspecialistasValidos : any[] = [];
  arrPacientes : any[] = [];

  pacienteSeleccionado : any;
  especialistaSeleccionado : any;
  fechaSeleccionada : any;
  horaSeleccionada : any;

  dias : any[] = [];
  diasValidos : any[] = [];

  horasValidas : any[] = [];
  fechasValidas : any[] = [];

  mostrarPacientes : boolean = false;
  mostrarEspecialidades : boolean = true;
  mostrarEspecialistas : boolean = false;
  mostrarDias : boolean = false;
  mostrarFechas : boolean = false;
  mostrarHoras : boolean = false;

  constructor(private db : AngularFirestore, public auth : AuthService, private firebase : FirebaseService, private datePipe : DatePipe, private utilidades : UtilidadesService){
    this.coleccion = this.db.collection<any>('especialidades');
    this.especialidades = this.coleccion.valueChanges();

    this.coleccion = this.db.collection<any>('usuarios');
    this.usuarios = this.coleccion.valueChanges({idField: 'id'});

  }

  ngOnInit(): void {

    this.especialidades.subscribe((especialidades : any) => {
      this.especialidadesBD = especialidades;
    });

    this.usuarios.subscribe((usuarios : any) => {
      this.usuariosBD = usuarios;

      if(this.auth.currentUser?.tipo == 'admin'){
        this.usuariosPacientes();
      }
      this.usuariosEspecialistas();
      
    });

  }

  seleccionarPaciente(item : any){
    this.pacienteSeleccionado = item;
    this.mostrarPacientes = false;
    this.mostrarEspecialidades = true;
  }

  seleccionarEspecialidad(item : any){
    this.especialidadSeleccionada = item.especialidad;
    this.mostrarEspecialidades = false;
    this.mostrarEspecialistas = true;
    this.cambioEspecialidad();
  }

  seleccionarEspecialista(item : any){
    this.especialistaSeleccionado = item;
    this.mostrarEspecialistas = false;
    this.mostrarDias = true;
    this.seleccionFechaTurno();
  }

  cambioEspecialidad(){
    this.arrEspecialistasValidos = this.arrEspecialistas.filter((i) => {

      for(let item of i.especialidades){
        if(item == this.especialidadSeleccionada){
          return true;
        }
      }
      return false;
    })
  }

  usuariosPacientes(){
    if(this.arrPacientes.length == 0){
      for(let item of this.usuariosBD){
        if(item.tipo == 'paciente'){
          this.arrPacientes.push(item);
        }
      }
    }
    this.mostrarEspecialidades = false;
    this.mostrarPacientes = true;
  }

  usuariosEspecialistas(){
    if(this.arrEspecialistas.length == 0 && this.arrEspecialistasValidos.length == 0){
      for(let item of this.usuariosBD){
        if(item.tipo == 'especialista'){
          if(item.cuentaVerificada && item.dias != null && item.horarios != null){
            this.arrEspecialistas.push(item);
            this.arrEspecialistasValidos.push(item);
          }
        }
      }
    }

  }

  seleccionFechaTurno(){
    for(let item of this.usuariosBD){
      if((item.nombre + ' ' + item.apellido) == this.especialistaSeleccionado){
        this.especialistaSeleccionado = item;
        break;
      }
    }

    this.cargarFechas();
  }

  getFechasValidas(){
    
    let aux : any[] = [];
    let retorno : any[] = [];
    let fecha = new Date();

    console.log(this.especialistaSeleccionado.dias)

    for(let item of this.especialistaSeleccionado.dias){
      switch(item){
        case 'Lunes': 
          aux.push(1);
          break;
        case 'Martes':
          aux.push(2);
          break;
        case 'Miercoles': 
          aux.push(3);
          break;
        case 'Jueves':
          aux.push(4);
          break;
        case 'Viernes': 
          aux.push(5);
          break;
        case 'Sabado':
          aux.push(6);
          break;
      }
    }

    console.log(aux)

    for(let item of this.dias){
      fecha.setDate(item.getDate());
        if(aux.includes(fecha.getDay())){
          console.log(fecha.getDay())
          retorno.push(item);
        }
    }

    this.diasValidos = retorno;
  }

  cargarFechas(){
    this.dias = [];
    let fecha = new Date();
    for(let i = 0; i < 15; i++){
      fecha.setDate(fecha.getDate() + 1);
      if(fecha.getDay() != 0){
        this.dias.push(new Date(fecha));
      }
      else{
        i--;
      }
    }

    this.getFechasValidas();
  }

  seleccionDia(opcion : any){
    this.mostrarDias = false

    let aux : any;
    let fecha = new Date()
    let retorno : any[] = [];

    switch(opcion){
      case 'Lunes': 
        aux = 1;
        break;
      case 'Martes':
        aux = 2;
        break;
      case 'Miercoles': 
        aux = 3;
        break;
      case 'Jueves':
        aux = 4;
        break;
      case 'Viernes': 
        aux = 5;
        break;
      case 'Sabado':
        aux = 6;
        break;
    }
    
    for(let item of this.dias){
      fecha.setDate(item.getDate());
        if(aux == fecha.getDay()){
          item = this.datePipe.transform(item, 'dd/MM/yyyy');
          let aux = this.seleccionFecha(item);

          retorno.push({
            fecha : item,
            horas : aux
          });
        }
    }

    this.fechasValidas = retorno;
    this.mostrarFechas = true;
  }

  seleccionFecha(opcion : any){

    this.fechaSeleccionada = opcion;
    console.log(this.fechaSeleccionada);

    let index : any;

    this.horasValidas = this.especialistaSeleccionado.horarios.map((item : any) => item);

    if(this.especialistaSeleccionado.turnos != null){

        for(let item of this.especialistaSeleccionado.turnos) 
        {
          console.log(item);
          if(item.dia == this.fechaSeleccionada){
            for(let horario of this.especialistaSeleccionado.horarios){
              if(horario == item.hora){
                index = this.horasValidas.indexOf(horario);
                if(index != -1){
                  this.horasValidas.splice(index, 1);
                }
              }
            }
          }
        }

    }

    return this.horasValidas;

  }

  seleccionHora(opcion : any){
    this.horaSeleccionada = opcion;

    this.agregarTurno();
  }

  agregarTurno(){

    let turno : Turno;

    if(this.auth.currentUser?.tipo == 'admin'){
        turno  = {
        dniPaciente : this.pacienteSeleccionado.dni,
        paciente : this.pacienteSeleccionado.nombre + ' ' + this.pacienteSeleccionado.apellido,
        dniEspecialista : this.especialistaSeleccionado.dni,
        especialista : this.especialistaSeleccionado.nombre + ' ' + this.especialistaSeleccionado.apellido,
        especialidad : this.especialidadSeleccionada,
        dia : this.fechaSeleccionada,
        hora : this.horaSeleccionada,
        aceptado: false,
        realizado: false,
        rechazado: false,
      }
    }else{
      turno  = {
        dniPaciente : this.auth.currentUser.dni,
        paciente : this.auth.currentUser.nombre + ' ' + this.auth.currentUser.apellido,
        dniEspecialista : this.especialistaSeleccionado.dni,
        especialista : this.especialistaSeleccionado.nombre + ' ' + this.especialistaSeleccionado.apellido,
        especialidad : this.especialidadSeleccionada,
        dia : this.fechaSeleccionada,
        hora : this.horaSeleccionada,
        aceptado: false,
        realizado: false,
        rechazado: false,
      }
    }

    this.firebase.subirTurno(turno);

    let auxTurno : any;
    
    if(this.auth.currentUser?.tipo == 'admin'){
      auxTurno  = {
        dniPaciente : this.pacienteSeleccionado.dni,
        dia : this.fechaSeleccionada,
        hora : this.horaSeleccionada,
      }
    }else{
      auxTurno  = {
        dniPaciente : this.auth.currentUser.dni,
        dia : this.fechaSeleccionada,
        hora : this.horaSeleccionada,
      }
    }

    console.log(this.especialistaSeleccionado)

    if(this.especialistaSeleccionado.turnos == null){
      let aux : any[] = [];
      aux.push(auxTurno);
      this.especialistaSeleccionado.turnos = aux;
    }else{
      this.especialistaSeleccionado.turnos.push(auxTurno);
    }

    this.firebase.modificarUsuario(this.especialistaSeleccionado, this.especialistaSeleccionado.id);
    this.mostrarFechas = false;
    if(this.auth.currentUser?.tipo == 'admin'){
      this.mostrarPacientes = true
    }else{
      this.mostrarEspecialidades = true;
    }

    this.pacienteSeleccionado = null;
    this.especialidadSeleccionada = '';
    this.especialistaSeleccionado = null;
    this.fechaSeleccionada = '';
    this.horaSeleccionada = '';

    this.utilidades.mostrarToastSuccess('Turno solicitado', 'Su turno ha sido solicitado');
  }

}
