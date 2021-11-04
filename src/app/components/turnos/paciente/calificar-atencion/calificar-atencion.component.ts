import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-calificar-atencion',
  templateUrl: './calificar-atencion.component.html',
  styleUrls: ['./calificar-atencion.component.scss']
})
export class CalificarAtencionComponent implements OnInit {

  @Input() atencion : any;

  constructor(private firebase : FirebaseService, private utilidades : UtilidadesService) { }

  ngOnInit(): void {
  }

  enviar(){
    let atencionEspecialista = (<HTMLInputElement> document.getElementById('atencionEspecialista')).value;
    let respondioDudas = (<HTMLInputElement> document.getElementById('respondioDudas')).value;
    let solucionoProblemas = (<HTMLInputElement> document.getElementById('solucionoProblemas')).value;

    let aux : any = {
      atencionEspecialista : atencionEspecialista,
      respondioDudas : respondioDudas,
      solucionoProblemas : solucionoProblemas
    }

    this.atencion.atencionEspecialista = aux;

    this.firebase.modificarTurno(this.atencion, this.atencion.id);
    this.utilidades.mostrarToastSuccess('Encuesta enviada', 'Su encuesta ha sido enviada');

    (<HTMLInputElement> document.getElementById('atencionEspecialista')).value = '5';
    (<HTMLInputElement> document.getElementById('respondioDudas')).value = '5';
    (<HTMLInputElement> document.getElementById('solucionoProblemas')).value = '5';
  }
}
