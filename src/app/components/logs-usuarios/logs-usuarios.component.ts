import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-logs-usuarios',
  templateUrl: './logs-usuarios.component.html',
  styleUrls: ['./logs-usuarios.component.scss']
})
export class LogsUsuariosComponent implements OnInit {

  coleccion : any;
  logs : any;
  logsBD : any;
  ultimosLogs : any;

  constructor(private db : AngularFirestore) { 
    this.coleccion = this.db.collection<any>('logs');
    this.logs = this.coleccion.valueChanges();
  }

  ngOnInit(): void {

    this.logs.subscribe((logs : any) => {
      this.logsBD = logs;

      this.ordenarLogs();
      console.log(this.logsBD)
    });

  }

  ordenarLogs(){

    this.ultimosLogs = [];

    this.logsBD = this.logsBD.sort(( a : any, b : any) => {
      return <any>new Date(b.fecha) - <any>new Date(a.fecha)
    });

    for(let item of this.logsBD){

      if(this.ultimosLogs.length <= 10){
        this.ultimosLogs.push(item);
      }else{
        break;
      }

    }
  }

}
