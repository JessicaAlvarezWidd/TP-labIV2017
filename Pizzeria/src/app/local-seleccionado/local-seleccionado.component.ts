import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
@Component({
  selector: 'app-local-seleccionado',
  templateUrl: './local-seleccionado.component.html',
  styleUrls: ['./local-seleccionado.component.css']
})
export class LocalSeleccionadoComponent implements OnInit {

  locales: FirebaseListObservable<any[]>;
  pedidos : FirebaseListObservable<any[]>;
  productos : FirebaseListObservable<any[]>;
  clave : any;
  subcribe : any;
  cantidadProductos;
  arrayClaveProductos : Array<boolean> = [];
  arrayCantidadProductos : Array<any> = [];
  arrayCantidadPedidos : Array<any> = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  productosSeleccionados : Array<any> = [];
  productosLocal : Array<any> = [];
  productosAArray : Array<any> = [];
  tengoUnProducto = false;
  tengoUnaOferta = false;
  productosObjetos;
  ofertasObjetos;
  miLocalSeleccionado;

  constructor(private db: AngularFireDatabase,
              private Router : Router,
              private route: ActivatedRoute) {

                this.locales = this.db.list('/locales');

                
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

            if(unLocal.productos != (null && undefined)){ //para ver si existe algun producto
              console.log("tengoUnProducto");
              this.cantidadProductos = Object.keys(unLocal.productos).length;//cargo la cantidad de productos que tiene este local para hacer una iteracion q concuerde con la cantidad de productos que el local
              this.productosObjetos = this.generateArray(unLocal.productos); //tranformo a objeto el json para poder ingresar como un array []
              this.tengoUnProducto = true;
            }
            
            if(unLocal.ofertas != (null && undefined)){
              console.log("tengoUnaOferta");
              this.ofertasObjetos = this.generateArray(unLocal.ofertas); //tranformo a objeto el json para poder ingresar como un array []

              /*if(this.productosObjetos[0].nombre == "ninguno") //comparo el primer producto para filtrar en la vista
              {
                  this.tengoUnProducto = false;
                
              }
              if(this.ofertasObjetos[0].nombre == "ninguno") //comparo la primera oferta para filtrar en la vista
              {
                  this.tengoUnaOferta = false;               
              }*/

              this.tengoUnaOferta = true;
            }   
          }  
        });

        if(this.tengoUnProducto){
          for (var index = 0; index < this.cantidadProductos; index++) {
            this.arrayClaveProductos.push(false);
          }
          console.log(this.arrayClaveProductos);
        }
        
                  
      });

      
  }

  reservarProductos(local) //me guarda el conjunto de productos que pide el cliente
  {

    this.pedidos = this.db.list('/locales/' + local +'/pedidos');
    this.productos = this.db.list('/locales/' + local +'/productos');

      var contador = 0;
      this.productos.subscribe(item=>{
            item.forEach(element => {
              if(this.arrayClaveProductos[contador])
              {
                this.productosSeleccionados.push(element.nombre);
                
              }
              //console.log(element);
              contador++;
            });
            
        });



      console.log(this.productosSeleccionados);     
    
      this.pedidos.push({
        "listaProductos" : this.productosSeleccionados
      }); 
  }

  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return obj[key]});
  }

  ofertas(local)
  {
    //this.Router.navigateByUrl('/local-seleccionado');
    this.Router.navigate(['/local-seleccionado', local]);
  }

  reservar(nombreOferta,local)
  {
      //console.log(nombreOferta,local);
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

  altaOferta(local)
  {
    console.log(this.cantidadProductos);
    if(this.cantidadProductos > 1)
    {
      this.Router.navigate(['/ofertas', local]);
    }
    else{
      alert("DEBE TENER AL MENOS 2 PRODUCTOS PARA DAR DE ALTA UNA OFERTA");
    }
    
  }

  altaProducto(local)
  {
    this.Router.navigate(['/productos', local]);
  }
  

}
