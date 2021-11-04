import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-rechazar-turno-especialista',
  templateUrl: './rechazar-turno-especialista.component.html',
  styleUrls: ['./rechazar-turno-especialista.component.scss']
})
export class RechazarTurnoEspecialistaComponent implements OnInit {

  @Input() rechazar : any;

  constructor(private firebase : FirebaseService, private utilidades : UtilidadesService) { }

  ngOnInit(): void {
  }

  confirmar(){
    let comentario = (<HTMLTextAreaElement> document.getElementById('comentario'))?.value;
    
    if(comentario != ''){
      this.rechazar.rechazado = true;
      this.rechazar.comentarioRechazado = comentario
      this.firebase.modificarTurno(this.rechazar, this.rechazar.id);
      (<HTMLTextAreaElement> document.getElementById('comentario')).value = '';
      this.utilidades.mostrarToastSuccess('Turno rechazado', 'El turno ha sido rechazado');
    }else{
      this.utilidades.mostrarToastError('Debe dejar un motivo', 'Deje un comentario para poder rechazar')
    }
  }

}
