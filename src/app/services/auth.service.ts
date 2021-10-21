import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser : any;
  isLoggedIn : any;

  constructor(public auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      this.isLoggedIn = user;
    })
  }

  login(email : any, password : any){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut(){
    return this.auth.signOut();
  }

  register(email : any, password : any){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  async enviarEmail(){
    return (await this.auth.currentUser)?.sendEmailVerification();
  }
}
