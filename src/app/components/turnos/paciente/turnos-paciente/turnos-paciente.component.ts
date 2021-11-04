import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-turnos-paciente',
  templateUrl: './turnos-paciente.component.html',
  styleUrls: ['./turnos-paciente.component.scss']
})
export class TurnosPacienteComponent implements OnInit {

  cancelar : any;
  resena : any;
  encuesta : any;
  atencion : any;

  mostrarCancelar : boolean = false;
  mostrarResena : boolean = false;
  mostrarEncuesta : boolean = false;
  mostrarAtencion : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  cancelarTurno(event : any){
    this.cancelar = event;
    this.mostrarCancelar = true;
    this.mostrarResena = false;
    this.mostrarEncuesta = false;
    this.mostrarAtencion = false;
  }

  verResena(event : any){
    this.resena = event;
    this.mostrarCancelar = false;
    this.mostrarResena = true;
    this.mostrarEncuesta = false;
    this.mostrarAtencion = false;
  }

  completarEncuesta(event : any){
    this.encuesta = event;
    this.mostrarCancelar = false;
    this.mostrarResena = false;
    this.mostrarEncuesta = true;
    this.mostrarAtencion = false;
  }

  calificarAtencion(event : any){
    this.atencion = event;
    this.mostrarCancelar = false;
    this.mostrarResena = false;
    this.mostrarEncuesta = false;
    this.mostrarAtencion = true;
  }
}
