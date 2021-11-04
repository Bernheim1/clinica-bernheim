import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-turnos-administrador',
  templateUrl: './turnos-administrador.component.html',
  styleUrls: ['./turnos-administrador.component.scss']
})
export class TurnosAdministradorComponent implements OnInit {

  cancelar : any;

  mostrarCancelar : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  cancelarTurno(event : any){
    this.cancelar = event;
    this.mostrarCancelar = true;
  }
}
