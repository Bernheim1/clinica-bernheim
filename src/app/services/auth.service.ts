import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser : any;
  isLoggedIn : any;

  constructor(public auth: AngularFireAuth, private router : Router) {
    this.auth.authState.subscribe((user) => {
      this.isLoggedIn = user;
    })
  }

  login(email : any, password : any){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut(){
    this.auth.signOut()
    .then(() => {
      this.router.navigate(['/login']);
      this.currentUser = null;
    })
    .catch((e) => {
      console.log(e);
    })
  }

  register(email : any, password : any){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  async enviarEmail(){
    return (await this.auth.currentUser)?.sendEmailVerification();
  }
}
