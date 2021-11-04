import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-resena-turno-especialista',
  templateUrl: './ver-resena-turno-especialista.component.html',
  styleUrls: ['./ver-resena-turno-especialista.component.scss']
})
export class VerResenaTurnoEspecialistaComponent implements OnInit {

  @Input() resena : any;

  constructor() { }

  ngOnInit(): void {
  }

}
