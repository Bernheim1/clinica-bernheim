import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-completar-encuesta',
  templateUrl: './completar-encuesta.component.html',
  styleUrls: ['./completar-encuesta.component.scss']
})
export class CompletarEncuestaComponent implements OnInit {

  @Input() encuesta : any;

  constructor(private firebase : FirebaseService, private utilidades : UtilidadesService) { }

  ngOnInit(): void {
  }

  enviar(){
    let limpiezaConsultorio = (<HTMLInputElement> document.getElementById('limpiezaConsultorio')).value;
    let atencionRecepcionista = (<HTMLInputElement> document.getElementById('atencionRecepcionista')).value;
    let tiempoDeEspera = (<HTMLInputElement> document.getElementById('tiempoDeEspera')).value;

    let encuestaCliente : any = {
      limpiezaConsultorio : limpiezaConsultorio,
      atencionRecepcionista : atencionRecepcionista,
      tiempoDeEspera : tiempoDeEspera
    }

    this.encuesta.encuestaCliente = encuestaCliente;

    this.firebase.modificarTurno(this.encuesta, this.encuesta.id);
    this.utilidades.mostrarToastSuccess('Encuesta enviada', 'Su encuesta ha sido enviada');

    (<HTMLInputElement> document.getElementById('limpiezaConsultorio')).value = '5';
    (<HTMLInputElement> document.getElementById('atencionRecepcionista')).value = '5';
    (<HTMLInputElement> document.getElementById('tiempoDeEspera')).value = '5';
  }

}
