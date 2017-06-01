import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Router} from '@angular/router';
@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  locales: FirebaseListObservable<any[]>; 
  localesArray : Array<any> = [];
  i = 0;
  pedidos : FirebaseListObservable<any[]>;

  constructor(private Router : Router,
              private db: AngularFireDatabase) {

                
                this.locales = db.list('/locales');
                this.pedidos = db.list('/locales/pedidos')
                this.locales.subscribe(user=>{
                  console.log("locales",user);                
                
                });
                this.pedidos.subscribe(ped=>{
                  console.log("ped",ped);
                });
  }

  ngOnInit() {
  }

  generateArray(obj){
    this.i++;
    //console.log("entre al generar array" + " " + this.i);
    return Object.keys(obj).map((key)=>{ return obj[key]});
  }

  reservar(nombreOferta,local)
  {
    console.log(nombreOferta,local);

    //this.locales.set()
    /*this.db.database.ref("locales/local01/pedidos",
      "listaOfertas" : {
        "oferta1" : "promo3",
        "oferta2" : "promo1"
      },
      "listaProductos" : {
        "pedProd1" : "producto3",
        "pedProd2" : "producto2"
      },
      "precio" : 100
    });*/
        
    
  }

}
