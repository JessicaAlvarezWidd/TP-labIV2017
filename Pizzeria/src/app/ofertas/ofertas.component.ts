import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {
  subcribe : any;
  locales: FirebaseListObservable<any[]>; 
  localesArray : Array<any> = [];
  i = 0;
  pedidos : FirebaseListObservable<any[]>;
  clave;
  miLocalSeleccionado;
  cantidadProductos;
  productosObjetos : Array<any> = [];
  arrayClaveProductos : Array<boolean> = [];
  localOfertas : FirebaseListObservable<any[]>;
  nombre : string = "";

  constructor(private Router : Router,
              private db: AngularFireDatabase,
              private route : ActivatedRoute) {

              this.locales = db.list('/locales');
  }

  ngOnInit() {
    this.subcribe = this.route.params.subscribe(params => {
       this.clave = params['local'];
       console.log(this.clave);
      });

      this.locales.subscribe(Mislocales=>{
      Mislocales.forEach(unLocal => {
          
          if(unLocal.$key == this.clave)
          {
            this.miLocalSeleccionado = unLocal;            
            this.cantidadProductos = Object.keys(unLocal.productos).length;//cargo la cantidad de productos que tiene este local para hacer una iteracion q concuerde con la cantidad de productos que el local
            this.productosObjetos = this.generateArray(unLocal.productos); //tranformo a objeto el json para poder ingresar como un array []
           
          }  
        });

        for (var index = 0; index < this.cantidadProductos; index++) {
           this.arrayClaveProductos.push(false);
        }
        console.log(this.arrayClaveProductos);
        
        
                  
      });
  }

  generateArray(obj){
    this.i++;
    //console.log("entre al generar array" + " " + this.i);
    return Object.keys(obj).map((key)=>{ return obj[key]});
  }

  aceptar(nombreOferta){
    var cantidadProductosSeleccionados = 0;
    this.arrayClaveProductos.forEach(element => {
      if(element)
      {
        cantidadProductosSeleccionados++;
      }
    });
    if(cantidadProductosSeleccionados > 1)
    {
      if(this.nombre.length < 3)
      {
        console.log("el nombre es menor a 3");
        alert("El nombre debe ser mayor a 3 letras");
      }
      else{
        this.localOfertas = this.db.list('/locales/' + this.clave + "/ofertas");
        var precio : number = 0;
        var unJson = JSON.parse('{ "myString": "string", "myNumber": 4 }');
        var stringJSon = '{';
        for(var i=0;this.cantidadProductos > i;i++)
        {
          if(this.arrayClaveProductos[i])
          {
            precio += Number(this.productosObjetos[i].precio);
            stringJSon += ' "prod' + i + '": ' + '"' + this.productosObjetos[i].nombre + '"' + ',';
          }
          
        }
        console.log(stringJSon.substr(0,(stringJSon.length - 1)));
        stringJSon = stringJSon.substr(0,(stringJSon.length - 1));
        stringJSon += '}';
        var unJson = JSON.parse(stringJSon);
        console.log(unJson);
        //console.log(precio);
        console.log(stringJSon);
        this.localOfertas.update(this.nombre,
          {
          "nombre" : this.nombre,
          "precio" : (precio * 0.8),
          "productosOfertas" : unJson
          
        });

        

     // });

      this.Router.navigate(['/local-seleccionado', this.clave]);
      }
      
    }
    else{
      alert("TIENE QUE SELECCIONAR AL MENOS 2 PRODUCTOS PARA FORMAR UNA OFERTA");
    }
  }

  cancelar(){
    this.Router.navigate(['/local-seleccionado', this.clave]);
  }

  /*reservar(nombreOferta,local)
  {
    console.log(nombreOferta,local);
    this.pedidos = this.db.list('/locales/' + local +'/pedidos');
    //this.locales.set()
     this.pedidos.subscribe(ped=>{
          console.log("ped",ped);
      });
    this.pedidos.push({
      "listaOfertas" : {
        "oferta1" : nombreOferta
       
      }
    }); 
  }

  localesMostrar()
  {
    this.Router.navigateByUrl('/locales');
  }*/
}
