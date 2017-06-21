import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { WsService }  from '../services/ws/ws.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;
  miUser : Usuario;

  constructor(private parentRouter : Router,
              public afAuth: AngularFireAuth,
              public ws : WsService) {
      this.user = afAuth.authState;
      this.miUser = new Usuario("asd@asd.com","asdasd");
      this.ws.CrearToken(this.miUser).then(item =>{console.log(item);});

  }

  ngOnInit() {
  }

  login() {
    //this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    //this.afAuth.auth.signInWithEmailAndPassword
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  registro()
  {
   
    this.parentRouter.navigateByUrl('/registro');
  }
}

export class Usuario{
  email : string;
  password : string;
  constructor(email,pass){
    this.email = email;
    this.password = pass;
  }
}