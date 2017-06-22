import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { WsService }  from '../services/ws/ws.service';

import { FileUploader } from "ng2-file-upload"; //IMG
const URL = "http://localhost/ws/index.php/api"; //IMG
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  foto = "../assets/img/usuarios/defecto.png";

  personas: FirebaseListObservable<any[]>; 
  usuario = {};
 
  imagen="defecto.png";
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  alertStylesNombre = {'border-color': ''};
  alertStylesApellido = {'border-color': ''};
  alertStylesDni = {'border-color': ''};
  alertStylesEmail = {'border-color': ''};
  alertStylesPass = {'border-color': ''};
  condicion1 = true;
  condicion2 = true;
  condicion3 = true;
  condicion4 = true;
  condicion5 = true;
  emailRepetido = false;
  numero = 4;
  errorFoto = false;
  Mensaje = "";
  
  calle;
  numeroCalle;
  barrio;
  nombre;
  apellido;
  email;
  dni;
  tipoPersona = "cliente";
  pass;
  miUser;

  constructor(private parentRouter : Router,
              private db: AngularFireDatabase,
              private auth : AngularFireAuth,
              private ws : WsService) { 
      this.personas = db.list('/personas');

      this.uploader.onBeforeUploadItem=(item)=>{console.info("item",item);item.withCredentials=false;} //item q selecciono
      this.uploader.onSuccessItem=(response,status)=>{this.errorFoto = false; //muestra la respuesta del server
        let json = JSON.parse(status);
        if(json.Exito)
        {
              this.imagen = json.foto;
              console.log(this.imagen);
              this.foto = "http://localhost/ws/tmp/"+this.imagen;
        }
        else
        {
              this.errorFoto = true;
              this.Mensaje = json.Mensaje;
              this.imagen = "defecto.png";
              this.foto = "../assets/img/usuarios/defecto.png";
        }};
  }

  ngOnInit() { }

  Cancelar()
  {     
    this.parentRouter.navigateByUrl('/login');
  }

  Imagen()
  {
    this.uploader.uploadAll();
    if((<HTMLInputElement>document.getElementById('file')).value == "")
    {
      this.foto = "assets/img/usuarios/defecto.png";
      this.imagen="defecto.png";
    }
  }

  Registrar(){    
      this.auth.auth.createUserWithEmailAndPassword(this.email,this.pass).then(item=>{
        this.personas.update(this.dni,{
          "apellido" : this.apellido,
          "direccion" : {
            "barrio" : this.barrio,
            "calle" : this.calle,
            "numero" : this.numeroCalle
          },
          "dni" : this.dni,
          "nombre" : this.nombre,
          "tipoPersona" : this.tipoPersona,
          "email" : this.email,
          "foto" : this.imagen
        }     
        );
        //this.ws.MoverFoto(this.imagen);
        this.miUser = new Usuario(this.email,this.pass);
        this.ws.CrearToken(this.miUser).then(item =>{console.log(item);});
        localStorage.setItem("bandera","1");
        this.parentRouter.navigateByUrl("/inicio");

      }).catch(error=>{
        console.log(error);
      });      
      
  }

  Verificar(num)
  {
    switch(num)
    {
      case 1:
        if((<HTMLInputElement>document.getElementById('nombre')).value == "")
        {
            this.alertStylesNombre = {'border-color': 'red'};
            this.condicion1 = true;
        }
        else
        {
            this.alertStylesNombre = {'border-color': 'green'};
            this.condicion1 = false;
        }
        break;
      case 2:
        if((<HTMLInputElement>document.getElementById('apellido')).value == "")
        {
            this.alertStylesApellido = {'border-color': 'red'};
            this.condicion2 = true;
        }
        else
        {
            this.alertStylesApellido = {'border-color': 'green'};
            this.condicion2 = false;
        }
        break;
      case 3:
        if((<HTMLInputElement>document.getElementById('dni')).value == "")
        {
            this.alertStylesDni = {'border-color': 'red'};
            this.condicion3 = true;
        }
        else
        {
            this.alertStylesDni = {'border-color': 'green'};
            this.condicion3 = false;
        }
        break;
      case 4:
        this.emailRepetido = false;
        if((<HTMLInputElement>document.getElementById('email')).value == "")
        {
            this.alertStylesEmail = {'border-color': 'red'};
            this.condicion4 = true;
        }
        else
        {
            this.alertStylesEmail = {'border-color': 'green'};
            this.condicion4 = false;
        }
        break;
      case 5:
        if((<HTMLInputElement>document.getElementById('password')).value == "")
        {
            this.alertStylesPass = {'border-color': 'red'};
            this.condicion5 = true;
        }
        else
        {
            this.alertStylesPass = {'border-color': 'green'};
            this.condicion5 = false;
        }
        break;
    }
  }


  Keyup(num)
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