import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-cancelar-turno-especialista',
  templateUrl: './cancelar-turno-especialista.component.html',
  styleUrls: ['./cancelar-turno-especialista.component.scss']
})
export class CancelarTurnoEspecialistaComponent implements OnInit {

  @Input() cancelar : any;

  constructor(private firebase : FirebaseService, private utilidades : UtilidadesService) { }

  ngOnInit(): void {
  }

  confirmar(){
    let comentario = (<HTMLTextAreaElement> document.getElementById('comentario'))?.value;
    
    if(comentario != ''){
      this.cancelar.cancelado = true;
      this.cancelar.comentarioCancelado = comentario
      this.firebase.modificarTurno(this.cancelar, this.cancelar.id);
      (<HTMLTextAreaElement> document.getElementById('comentario')).value = '';
      this.utilidades.mostrarToastSuccess('Turno cancelado', 'El turno ha sido cancelado');
    }else{
      this.utilidades.mostrarToastError('Debe dejar un motivo', 'Deje un comentario para poder cancelar')
    }
  }
}
