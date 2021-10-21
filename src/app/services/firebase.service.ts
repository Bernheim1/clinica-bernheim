import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Admin } from '../clases/admin';
import { Especialista } from '../clases/especialista';
import { Paciente } from '../clases/paciente';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
 
  constructor(public firestore : AngularFirestore, public storage : AngularFireStorage) { }

  getFileRef(filePath : string){
    return this.storage.ref(filePath);
  }

  uploadFile(filePath : string, file : any){
    return this.storage.upload(filePath, file);
  }

  subirPaciente(paciente : Paciente){
    this.firestore.collection('usuarios').add(paciente)
    .then((respuesta) => {
      console.log(respuesta);
    }).catch((err) => {
      console.error(err);
    });
  }

  subirEspecialista(especialista : Especialista){
    this.firestore.collection('usuarios').add(especialista)
    .then((respuesta) => {
      console.log(respuesta);
    }).catch((err) => {
      console.error(err);
    });
  }

  subirAdmin(admin : Admin){
    this.firestore.collection('usuarios').add(admin)
    .then((respuesta) => {
      console.log(respuesta);
    }).catch((err) => {
      console.error(err);
    });
  }

  modificarUsuario(object : any, id : any){
    return this.firestore.collection('usuarios').doc(id).update(object);
  }

}
