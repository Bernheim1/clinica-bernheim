import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-turnos-especialista',
  templateUrl: './turnos-especialista.component.html',
  styleUrls: ['./turnos-especialista.component.scss']
})
export class TurnosEspecialistaComponent implements OnInit {

  cancelar : any;
  resena : any;
  rechazar : any;
  finalizar : any;

  mostrarCancelar : boolean = false;
  mostrarResena : boolean = false;
  mostrarRechazar : boolean = false;
  mostrarFinalizar : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  cancelarTurno(event : any){
    this.cancelar = event;
    this.mostrarCancelar = true;
    this.mostrarResena = false;
    this.mostrarRechazar = false;
    this.mostrarFinalizar = false;
  }

  verResena(event : any){
    this.resena = event;
    this.mostrarCancelar = false;
    this.mostrarResena = true;
    this.mostrarRechazar = false;
    this.mostrarFinalizar = false;
  }

  rechazarTurno(event : any){
    this.rechazar = event;
    this.mostrarCancelar = false;
    this.mostrarResena = false;
    this.mostrarRechazar = true;
    this.mostrarFinalizar = false;
  }

  finalizarTurno(event : any){
    this.finalizar = event;
    this.mostrarCancelar = false;
    this.mostrarResena = false;
    this.mostrarRechazar = false;
    this.mostrarFinalizar = true;
  }
}
