import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Router} from '@angular/router';
@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesComponent implements OnInit {

  locales: FirebaseListObservable<any[]>; 
  localesArray : Array<Locales> = [];
  i = 0;

  constructor(private Router : Router,
              private db: AngularFireDatabase) {

                this.locales = db.list('/locales');
                this.locales.subscribe(user=>{
                user.forEach(element => {
                  //var unLocal = new Locales(element.barrio,element.calle,element.numero);
                  
                  
                });


              });

              
               

  }

  ngOnInit() {
  }

  generateArray(obj){
    this.i++;
    console.log("entre al generar array" + " " + this.i);
    return Object.keys(obj).map((key)=>{ return obj[key]});
  }

}

class Locales {
    direccion : Array<any> = [];
    dire 
    foto1 : string;
    foto2 : string;
    foto3 : string;
    listaOfertas : Array<ofertas> = [];
    listaPedidos : Array<pedidos> = [];
    listaProductos : Array<productos> = [];

    constructor(barrio,calle,numero,foto1,foto2,foto3,listaOfertas,listaPedidos,listaProductos) { 
      this.direccion.push(barrio);
      this.direccion.push(calle);
      this.direccion.push(numero);
      this.foto1 = foto1;
      this.foto2 = foto2;
      this.foto3 = foto3;
      this.listaOfertas = listaOfertas;
      this.listaPedidos = listaPedidos;
      this.listaProductos = listaProductos;

    }
    
}

class ofertas{

    precio : string;
    listaProductos : Array<productos> = [];

    constructor(precio,listaProductos) {
      this.precio = precio;
      this.listaProductos = listaProductos;
      }
    
}

class pedidos extends ofertas {

    //precio : string;
    //listaProductos : Array<productos> = [];
    listaOfertas : Array<ofertas> = [];

    constructor(listaOfertas,precio,listaProductos) {
       super(precio,listaProductos);
       this.listaOfertas = listaOfertas;
    }
    
}

class productos {

    precio : string;
    nombre : string;
    foto1 : string;
    foto2 : string;
    foto3 : string;

    constructor(precio,nombre,foto1,foto2,foto3) { 
      this.precio = precio;
      this.nombre = nombre;
      this.foto1 = foto1;
      this.foto2 = foto2;
      this.foto3 = foto3;
     }
    
    
}
