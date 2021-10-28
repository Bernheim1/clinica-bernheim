import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.scss']
})
export class AltaTurnoComponent implements OnInit {

  public form !: FormGroup;
  coleccion : any;
  especialidades : any;
  especialidadesBD : any;
  especialidadSeleccionada : any;

  usuarios : any;
  usuariosBD : any;
  arrEspecialistas : any[] = [];
  arrEspecialistasValidos : any[] = [];

  especialistaSeleccionado : any;
  fechaSeleccionada : any;
  horaSeleccionada : any;

  fechaInput : any;

  seleccionarDia : boolean = false;
  seleccionarFecha : boolean = false;
  seleccionarHora : boolean = false;

  dias : any[] = [];
  diasValidos : any[] = [];

  horasValidas : any[] = [];
  fechasValidas : any[] = [];

  constructor(private fb : FormBuilder, private db : AngularFirestore, private auth : AuthService, private firebase : FirebaseService, private datePipe : DatePipe){
    this.coleccion = this.db.collection<any>('especialidades');
    this.especialidades = this.coleccion.valueChanges();

    this.coleccion = this.db.collection<any>('usuarios');
    this.usuarios = this.coleccion.valueChanges({idField: 'id'});
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      'especialidad': ['', Validators.required],
      'especialista': ['', Validators.required],
      'fechaTurno': ['', Validators.required],
    });

    this.especialidades.subscribe((especialidades : any) => {
      this.especialidadesBD = especialidades;
    });

    this.usuarios.subscribe((especialidades : any) => {
      this.usuariosBD = especialidades;
      this.usuariosEspecialistas();
    });

    
  }

  seleccionEspecialidad(event : any){
    this.especialidadSeleccionada = event.target.value;
    this.cambioEspecialidad();
  }

  seleccionEspecialista(event : any){
    this.especialistaSeleccionado = event.target.value;
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

  usuariosEspecialistas(){
    if(this.arrEspecialistas.length == 0 && this.arrEspecialistasValidos.length == 0){
      for(let item of this.usuariosBD){
        if(item.tipo == 'especialista'){
          if(item.cuentaVerificada){
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

    console.log(this.dias);
    console.log(this.diasValidos);

    this.seleccionarDia = true;

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
    this.seleccionarDia = false

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
          retorno.push(item);
        }
    }

    this.fechasValidas = retorno;
    this.seleccionarFecha = true;
  }

  seleccionFecha(opcion : any){

    this.seleccionarFecha = false;

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

    this.seleccionarHora = true;
  }

  seleccionHora(opcion : any){
    this.horaSeleccionada = opcion;
    this.seleccionarHora = false;
    this.fechaInput = this.fechaSeleccionada + ' ' + this.horaSeleccionada;

    this.form.get('fechaTurno')?.setValue('true');
  }

  agregarTurno(){
    let turno : Turno = {
      dniPaciente : this.auth.currentUser.dni,
      especialista : this.especialistaSeleccionado.nombre + ' ' + this.especialistaSeleccionado.apellido,
      especialidad : this.especialidadSeleccionada,
      dia : this.fechaSeleccionada,
      hora : this.horaSeleccionada,
    }
    this.firebase.subirTurno(turno);

    let auxTurno : any = {
      dniPaciente : this.auth.currentUser.dni,
      dia : this.fechaSeleccionada,
      hora : this.horaSeleccionada,
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

    this.form.reset();
    this.fechaInput = '';
  }

}
