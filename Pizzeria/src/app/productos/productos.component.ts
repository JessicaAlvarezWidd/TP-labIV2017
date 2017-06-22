import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  alertStylesEmail = {'border-color': ''};
  alertStylesPass = {'border-color': ''};
  condicion1 = true;
  condicion2 = true;
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
      "foto1" : "default.png",//this.producto.fotoUno,
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
