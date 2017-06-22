import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-info-pedido',
  templateUrl: './info-pedido.component.html',
  styleUrls: ['./info-pedido.component.css']
})
export class InfoPedidoComponent implements OnInit {

  locales: FirebaseListObservable<any[]>;
  private currentUser: firebase.User;
  subcribe;
  clave;
  miLocalSeleccionado;
  tengoUnPedido = false;
  cantidadPedidos;
  pedidosObjetos : Array<any> = [];
  email;
  arrayPedidos : Array<any> = [];

  constructor(private db: AngularFireDatabase,
              private Router : Router,
              private route: ActivatedRoute,              
              public afAuth : AngularFireAuth) { 
                this.locales = this.db.list('/locales');
                afAuth.authState.subscribe((user: firebase.User)=> {this.currentUser = user; console.log(this.currentUser.email); this.email = this.currentUser.email; });
              }

  ngOnInit() {
    /*this.subcribe = this.route.params.subscribe(params => {
       this.clave = params['local'];
       console.log(this.clave);
      });*/

      this.locales.subscribe(Mislocales=>{
      Mislocales.forEach(unLocal => {
          
            //this.miLocalSeleccionado = unLocal;

            if(unLocal.pedidos != (null && undefined)){ //para ver si existe algun producto
              console.log("tengoPedidos");
              //this.cantidadPedidos = Object.keys(unLocal.pedidos).length;//cargo la cantidad de productos que tiene este local para hacer una iteracion q concuerde con la cantidad de productos que el local
              this.pedidosObjetos = this.generateArray(unLocal.pedidos); //tranformo a objeto el json para poder ingresar como un array []
              this.pedidosObjetos.forEach(item=>{
                this.arrayPedidos.push(item);
              });
              this.tengoUnPedido = true;
              console.log(this.pedidosObjetos);
            }
          
        });

        console.log(this.arrayPedidos);
      });
  }

  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return obj[key]});
  }
}
