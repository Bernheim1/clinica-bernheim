import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-seleccion-registro',
  templateUrl: './seleccion-registro.component.html',
  styleUrls: ['./seleccion-registro.component.scss']
})
export class SeleccionRegistroComponent implements OnInit {

  tipo : any;
  seleccionado : boolean = false;
  @Input() admin : boolean = false;

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
    this.verificarAdmin();
  }

  seleccionTipo(opcion : string){
    if(opcion === 'paciente'){
      this.tipo = 'paciente';
    }else{
      if(opcion === 'especialista'){
        this.tipo = 'especialista';
      }else{
        this.tipo = 'admin';
      }
    }
    this.seleccionado = true;
  }

  verificarAdmin(){
    if(this.auth.currentUser?.tipo == 'admin'){
      this.admin = true;
    }
  }

}
