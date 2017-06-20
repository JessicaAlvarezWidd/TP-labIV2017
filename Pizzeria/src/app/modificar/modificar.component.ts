import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  clientes: FirebaseListObservable<any[]>;

  id : any;
  subcribe : any;
  
  usuario = {nombre : "",
            apellido : "",
            dni: "",
            direccion : {
              calle : "",
              numero : "",
              barrio : ""
            },
            sexo : ""
          };

  constructor(private db: AngularFireDatabase,
              private Router : Router,
              private route: ActivatedRoute) {

                
                

               
               }

  ngOnInit() {
      this.subcribe = this.route.params.subscribe(params => {
       this.id = params['id'];
       console.log(this.id);
      });

      this.clientes = this.db.list('/clientes');

               this.clientes.subscribe(users=>{
                 users.forEach(element => {
                    if(element.$key == this.id)
                      this.usuario = element;
                      
                      //this.usuario.apellido = element
                 });               
                  
          });
  }

  cancelar()
  {
    this.Router.navigateByUrl('/usuarios');
  }

  aceptar()
  {
      this.clientes.update(this.id,
        {
        "apellido" : this.usuario.apellido,
        "direccion" : 
          {
            "barrio" : this.usuario.direccion.barrio,
            "calle" : this.usuario.direccion.calle,
            "numero" : this.usuario.direccion.numero
          },
        "dni" : this.usuario.dni,
        "nombre" : this.usuario.nombre,
        "sexo" : this.usuario.sexo,
        
      })
      this.Router.navigateByUrl('/usuarios');
  }

}