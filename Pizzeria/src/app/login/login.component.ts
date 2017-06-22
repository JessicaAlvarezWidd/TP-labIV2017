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

  alertStylesEmail = {'border-color': ''};
  alertStylesPass = {'border-color': ''};
  condicion1 = true;
  condicion2 = true;
  user: Observable<firebase.User>;
  miUser : Usuario;
  email = "asd@asd.com";
  password = "asdasd";
  registroMostrar = false;

  constructor(private parentRouter : Router,
              public afAuth: AngularFireAuth,
              public ws : WsService) {
      
      //this.Login();

     

  }

  ngOnInit() {
  }

  Login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email,this.password).then(
      (result) => {
          // all good, lets move on          
                 
          this.user = this.afAuth.authState;
          this.miUser = new Usuario(this.email,this.password);
          this.ws.CrearToken(this.miUser).then(item =>{console.log(item);});
          localStorage.setItem("bandera","1");
          this.parentRouter.navigateByUrl('/inicio');
      },
      (err) => {
          // something didn't work
        console.log(err);
        alert(err);
      }
    );
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  Registro()
  { 
   
    this.parentRouter.navigateByUrl('/registro');
  }

  Verificar(num)//VERIFICO QUE LOS CAMPOS DE LOS TEXT NO ESTEN VACIO EN CASO CONTRARIO LOS REMARCO Y DESACTIVO EL BOTON LOGIN.
  {
    switch(num)
    {
      case 1:
        if((<HTMLInputElement>document.getElementById('email')).value == "")
        {
            this.alertStylesEmail= {'border-color': 'red'};
            this.condicion1 = true;
        }
        else
        {
            this.alertStylesEmail = {'border-color': 'green'};
            this.condicion1 = false;
        }
        break;
      case 2:
        if((<HTMLInputElement>document.getElementById('password')).value == "")
        {
            this.alertStylesPass = {'border-color': 'red'};
            this.condicion2 = true;
        }
        else
        {
            this.alertStylesPass = {'border-color': 'green'};
            this.condicion2 = false;
        }
        break;
    }
  }
  Keyup(num)//PARA VALIDACION DEL TECLEADO DE LETRAS DE LOS INPUT.
  {
      this.Verificar(num);
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