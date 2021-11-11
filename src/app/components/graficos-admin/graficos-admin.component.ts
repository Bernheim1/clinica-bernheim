import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-graficos-admin',
  templateUrl: './graficos-admin.component.html',
  styleUrls: ['./graficos-admin.component.scss']
})
export class GraficosAdminComponent implements OnInit {

  chart: any = null;

  coleccion : any;
  turnos : any;
  turnosBD : any;

  arrEspecialidades : any[] = [];
  arrTurnosPorDia : any[] = [];
  arrTurnosEspecialista : any[] = [];
  arrTurnosFinalizados : any[] = [];

  constructor(private firebase : FirebaseService, private db : AngularFirestore) { 
    this.coleccion = this.db.collection<any>('turnos');
    this.turnos = this.coleccion.valueChanges({idField: 'id'});
  }

  ngOnInit(): void {
    this.turnos.subscribe((turnos : any) => {
      this.turnosBD = turnos;
      this.validarEspecialidades();
      this.validarTurnosPorDia();
      this.validarTurnosEspecialista();
      this.validarTurnosFinalizados();
      this.getChartData();
    });
  }

  validarEspecialidades() {

    this.arrEspecialidades = [];

    let aux : any;
    let flag : boolean = false;

    for(let turno of this.turnosBD){

      flag = false;
      
      aux = {
        especialidad : turno.especialidad,
        cantidad : 1
      }

      for(let item of this.arrEspecialidades){
        if(item.especialidad == aux.especialidad){
          item.cantidad++;
          flag = true;
        }
      }

      if(!flag){
        this.arrEspecialidades.push(aux);
      }

    }

  }

  validarTurnosPorDia() {

    this.arrTurnosPorDia = [];

    let aux : any;
    let flag : boolean = false;

    for(let turno of this.turnosBD){

      flag = false;
      
      aux = {
        dia : turno.dia,
        cantidad : 1
      }

      for(let item of this.arrTurnosPorDia){
        if(item.dia == aux.dia){
          item.cantidad++;
          flag = true;
        }
      }

      if(!flag){
        this.arrTurnosPorDia.push(aux);
      }

    }

  }

  validarTurnosFinalizados() {
    
    this.arrTurnosFinalizados = [];

    let aux : any;
    let flag : boolean = false;

    for(let turno of this.turnosBD){
      
      flag = false;

      aux = {
        especialista : turno.especialista,
        realizado : turno.realizado,
        cantidad : 1
      }

          
      if(aux.realizado){
        for(let item of this.arrTurnosFinalizados){

          if(item.especialista == aux.especialista){
            console.log(aux.realizado)
  
  
                item.cantidad++;
              
            
            
            flag = true;
          }
        }

        if(!flag){
          this.arrTurnosFinalizados.push(aux);
        }
      }

    }

    console.log(this.arrTurnosFinalizados)

  }

  validarTurnosEspecialista() {

    this.arrTurnosEspecialista = [];

    let aux : any;
    let flag : boolean = false;

    for(let turno of this.turnosBD){

      flag = false;
      
      aux = {
        especialista : turno.especialista,
        cantidad : 1
      }

      for(let item of this.arrTurnosEspecialista){
        if(item.especialista == aux.especialista){
          item.cantidad++;
          flag = true;
        }
      }

      if(!flag){
        this.arrTurnosEspecialista.push(aux);
      }

    }

    console.log(this.arrTurnosEspecialista)

  }

  getChartData(){

    let especialidades = this.arrEspecialidades.map((item : any) => {
      return item.especialidad;
    });

    let cantidadEspecialidad = this.arrEspecialidades.map((item : any) => {
      return item.cantidad;
    });

    let dias = this.arrTurnosPorDia.map((item : any) => {
      return item.dia;
    });

    let cantidadDia = this.arrTurnosPorDia.map((item : any) => {
      return item.cantidad;
    });

    let especialistas = this.arrTurnosEspecialista.map((item : any) => {
      return item.especialista;
    });

    let cantidadEspecialista = this.arrTurnosEspecialista.map((item : any) => {
      return item.cantidad;
    })

    let especialistasFinalizado = this.arrTurnosFinalizados.map((item : any) => {
      return item.especialista;
    });

    let cantidadEspecialistaFinalizado = this.arrTurnosFinalizados.map((item : any) => {
      return item.cantidad;
    })

    this.chart = {
      primero:{
        pieChartLabels: dias,
        pieChartData: cantidadDia,
        pieChartType: 'pie',
      },
      segundo:{
        pieChartLabels: especialidades,
        pieChartData: cantidadEspecialidad,
        pieChartType: 'pie',
      },
      tercero:{
        pieChartLabels: especialistas,
        pieChartData: cantidadEspecialista,
        pieChartType: 'pie',
      },
      cuarto:{
        pieChartLabels: especialistasFinalizado,
        pieChartData: cantidadEspecialistaFinalizado,
        pieChartType: 'pie',
      },
    }
  }


}
