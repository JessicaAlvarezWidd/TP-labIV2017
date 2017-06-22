import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WsService }  from '../services/ws/ws.service';
import { AutService } from '../services/auth/aut.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

   //usuario:Usuario= new Usuario(1,"nada","asdasd","asdasd","","","","","defecto.png");
  token:any;
  constructor(private router:Router,private aut:AutService,private ws : WsService,public fb : AngularFireAuth) 
  { 
    //this.ws.GetJwt().then(data => {this.usuario=data.rta.usuario;});
    //this.fb.authState.subscribe(item=>{});
    //this.fb.auth.signOut
    
  }

  ngOnInit() 
  {
    
   
    /*try 
    {
        this.token=this.ws.GetJwt().then(data => {console.log(data.rta.usuario.img);})
        //this.usuario=this.token.usuario;
    } 
    catch (error) 
    {
      console.log("No hay token!")
    }*/

  }
  Salir()
  {
    this.fb.auth.signOut();
    //var usu:Usuario = new Usuario(0,"Sin Usuario","asdasd","asdasd","","","","","defecto.png");//HACER CUANDO COMIENZE UNA PAGINA! OCTAVIO PRUEVA!
    localStorage.setItem('token', null);
    localStorage.setItem("bandera", "0");
    //localStorage.setItem('usuario', JSON.stringify(usu));
    //this.aut.logOut();  
    this.router.navigate(['/login']);
  
  }
  ObtenerUsuario()
  {
    //this.usuario= JSON.parse(localStorage.getItem("usuario"));
      //this.ws.GetJwt().then(data => {console.log(data.rta.usuario);});
    //return this.usuario;
    try 
    {
        //this.usuario= JSON.parse(localStorage.getItem("usuario"));
        //return this.usuario;
    } 
    catch (error) 
    {
      console.log("Cargando!");
    }
  }
    Comprobar()
  {

      if (this.aut.isLogued()==true) 
      {
        return true;
      }
      else
      {
        return false;
      }
    
    
  }

}








 