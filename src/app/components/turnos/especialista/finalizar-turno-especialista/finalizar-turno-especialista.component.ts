import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-finalizar-turno-especialista',
  templateUrl: './finalizar-turno-especialista.component.html',
  styleUrls: ['./finalizar-turno-especialista.component.scss']
})
export class FinalizarTurnoEspecialistaComponent implements OnInit {

  @Input() finalizar : any;
  coleccion : any;
  usuarios : any;
  usuariosBD : any;
  especialista : any;
  paciente : any;
  historiaClinica : any;

  public form !: FormGroup;

  constructor(private firebase : FirebaseService, private utilidades : UtilidadesService, private db : AngularFirestore, private auth : AuthService, private fb : FormBuilder ) { 
    this.coleccion = this.db.collection<any>('usuarios');
    this.usuarios = this.coleccion.valueChanges({idField: 'id'});
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      'altura': ['', Validators.required],
      'peso': ['', Validators.required],
      'temperatura': ['', Validators.required],
      'presion': ['', Validators.required],
    });

    this.usuarios.subscribe((usuarios : any) => {
      this.usuariosBD = usuarios;

      for(let item of this.usuariosBD){
        if(item.dni == this.auth.currentUser.dni){
          this.especialista = item;
          break;
        }
      }

      for(let item of this.usuariosBD){
        if(item.dni == this.finalizar.dniPaciente){
          this.paciente = item;
          break;
        }
      }
    });
  }

  confirmar(){
    let comentario = (<HTMLTextAreaElement> document.getElementById('comentario'))?.value;
    
    if(comentario != ''){
      this.finalizar.realizado = true;
      this.finalizar.resena = comentario;
      (<HTMLTextAreaElement> document.getElementById('comentario')).value = '';

      this.cargarHistoriaClinica();
      this.eliminarTurno();
      this.form.reset();

      this.finalizar.historiaClinica = this.historiaClinica;

      this.firebase.modificarTurno(this.finalizar, this.finalizar.id);

      let arrAux : any[] = [1,2,3];
      for(let i = 0; i < arrAux.length; i++){
        (<HTMLInputElement> document.getElementById(`clave${arrAux[i]}`)).value = '';
        (<HTMLInputElement> document.getElementById(`valor${arrAux[i]}`)).value = '';
      }

      this.utilidades.mostrarToastSuccess('Turno finalizado', 'El turno ha sido finalizado');
    }else{
      this.utilidades.mostrarToastError('Debe dejar un motivo', 'Deje una reseña para poder finalizar')
    }
  }

  eliminarTurno(){

    for(let item of this.especialista.turnos){
      if(this.finalizar.dniPaciente == item.dniPaciente){
        let index = this.especialista.turnos.indexOf(item);
        this.especialista.turnos.splice(index, 1);
        break;
      }
    }

    this.firebase.modificarUsuario(this.especialista, this.especialista.id);
  }

  cargarHistoriaClinica(){
    let formulario = this.form.value;
    let arrAux : any[] = [1,2,3];
    let clave : any;
    let valor : any;
    let claveValor : any;


    for(let i = 0; i < arrAux.length; i++){
      clave = (<HTMLInputElement> document.getElementById(`clave${arrAux[i]}`)).value;
      valor = (<HTMLInputElement> document.getElementById(`valor${arrAux[i]}`)).value;

      if(clave != '' && valor != ''){

        claveValor = {
          clave : clave,
          valor : valor
        }

        if(formulario.claveValor == null){
          let arr : any[] = [];
          arr.push(claveValor);
          formulario.claveValor = arr;
        }else{
          formulario.claveValor.push(claveValor);
        }
      }
    }

    if(this.paciente.historiaClinica == null){
      let aux : any[] = [];
      aux.push(formulario);
      this.paciente.historiaClinica = aux;
    }else{
      this.paciente.historiaClinica.push(formulario);
    }
    this.historiaClinica = formulario;
    this.firebase.modificarUsuario(this.paciente, this.paciente.id)
  }

}
