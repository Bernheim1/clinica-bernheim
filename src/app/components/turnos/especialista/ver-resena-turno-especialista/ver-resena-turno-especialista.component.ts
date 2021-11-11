import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ver-resena-turno-especialista',
  templateUrl: './ver-resena-turno-especialista.component.html',
  styleUrls: ['./ver-resena-turno-especialista.component.scss']
})
export class VerResenaTurnoEspecialistaComponent implements OnInit {

  @Input() resena : any;

  constructor(public auth : AuthService) { }

  ngOnInit(): void {
    console.log(this.resena);
  }

}
