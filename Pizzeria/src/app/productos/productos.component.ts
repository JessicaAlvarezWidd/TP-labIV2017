import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  clave : any;
  subcribe : any;
  localProductos : FirebaseListObservable<any[]>;

  producto = {nombre : "",
            fotoUno : "foto1ProdLocal",
            fotoDos: "foto2ProdLocal",
            fotoTres : "foto3ProdLocal",
            precio : ""
            
          };

  constructor(private db: AngularFireDatabase,
              private Router : Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.subcribe = this.route.params.subscribe(params => {
       this.clave = params['nombreLocal'];
       console.log("1º ngOnInit",this.clave);
      });

  }

  aceptar()
  {
    this.localProductos = this.db.list('/locales/' + this.clave + "/productos");
    this.localProductos.subscribe(item =>{
      console.log("lo que tengo en la fb", item);
    })

    this.localProductos.update(this.producto.nombre,{
      "foto1" : this.producto.fotoUno,
      //"foto2" : this.producto.fotoDos,
      //"foto3" : this.producto.fotoTres,
      "nombre" : this.producto.nombre,
      "precio" : this.producto.precio
    });

    this.Router.navigate(['/local-seleccionado', this.clave]);
  }

  cancelar()
  {
    this.Router.navigate(['/local-seleccionado', this.clave]);
  }

}
