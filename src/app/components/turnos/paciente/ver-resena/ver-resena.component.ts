import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-resena',
  templateUrl: './ver-resena.component.html',
  styleUrls: ['./ver-resena.component.scss']
})
export class VerResenaComponent implements OnInit {

  @Input() resena : any;

  constructor() { }

  ngOnInit(): void {
  }

}
