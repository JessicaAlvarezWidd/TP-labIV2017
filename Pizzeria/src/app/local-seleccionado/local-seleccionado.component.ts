import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'; // maps
import {Router, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { WsService } from '../services/ws/ws.service'; //maps

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
declare var google; //maps
@Component({
  selector: 'app-local-seleccionado',
  templateUrl: './local-seleccionado.component.html',
  styleUrls: ['./local-seleccionado.component.css']
})
export class LocalSeleccionadoComponent implements OnInit {
  //------------MAPA
  lugar; //MAPA
  obj={lat:"",lng:""}; //MAPA
  map: any;
  //------------MAPA
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
  fotos : Array<any> = [];

  private currentUser: firebase.User;

  constructor(private db: AngularFireDatabase,
              private Router : Router,
              private route: ActivatedRoute,
              public ws : WsService,
              public afAuth : AngularFireAuth) {

                this.locales = this.db.list('/locales');
                afAuth.authState.subscribe((user: firebase.User)=> {this.currentUser = user; console.log(this.currentUser.email); });
                

                
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
          this.productosObjetos.forEach(element => {
            if(element.foto1 != (null && undefined)){
              if(element.foto1 != "sinfoto"){
                 this.fotos.push(element.foto1);
              }               
              else{
                this.fotos.push("default.png");
              }
            }              
            
          });
          console.log(this.fotos);
          console.log(this.arrayClaveProductos);
        }
        
                  
      });

    //---------------MAPA
    this.CargarMapa()//Cargo el mapa!

    /*this.m1.setMap(this.map);

    this.m2.setMap(this.map);
    this.DibujarRuta(this.m1.position,this.m2.position);*/
    //------------------MAPA

  }

  reservarProductos(local) //me guarda el conjunto de productos que pide el cliente
  {

    this.pedidos = this.db.list('/locales/' + local +'/pedidos');
    this.productos = this.db.list('/locales/' + local +'/productos');
    var precio = 0;
      var contador = 0;
      this.productos.subscribe(item=>{
            item.forEach(element => {
              if(this.arrayClaveProductos[contador])
              {
                this.productosSeleccionados.push(element.nombre);
                precio+= Number(element.precio);
              }
              //console.log(element);
              contador++;
            });
            
        });



      console.log(this.productosSeleccionados);     
    
      this.pedidos.push({
        "listaProductos" : this.productosSeleccionados,
        "precio" : precio,
        "quienHizo" : this.currentUser.email,
        "queEs" : "producto"
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

  reservar(nombreOferta,local,precio)
  {
      //console.log(nombreOferta,local);
      this.pedidos = this.db.list('/locales/' + local +'/pedidos');
      //this.locales.set()
      this.pedidos.subscribe(ped=>{
            console.log("ped",ped);
        });
      this.pedidos.push({
        "oferta" : nombreOferta,
        "precio" : precio,
        "quienHizo" : this.currentUser.email,
        "queEs" : "oferta"
        
        
      }); 
  }

  verPedidos(local){
    this.Router.navigate(['/info-pedido', local]);
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
  
  

//MAPA
  //MAPAS
  @ViewChild('map') mapElement: ElementRef;
  directionsService;
  directionsDisplay;
  /*
  //MARCADOR 1
  lat = -34.8081469;
  lng = -58.4029402;
  latlng = new google.maps.LatLng(this.lat, this.lng);
  m1 = new google.maps.Marker({position: this.latlng, animation: google.maps.Animation.DROP, title: "Usuario"});

  
  //MARCADOR 2
  lat2 = -34.6654543;
  lng2 = -58.3679265;
  latlng2 = new google.maps.LatLng(this.lat2, this.lng2);
  m2 = new google.maps.Marker({position: this.latlng2, animation: google.maps.Animation.DROP, title: "Usuario"});
*/

  CargarMapa()
  {
    let latLng = new google.maps.LatLng(-34.8201154,-58.3714717);
     
    let mapOptions = {
      center: latLng,
      zoom: 4,
      minZoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.map
    })

    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.map
    })

    this.ws.getlatlng(this.miLocalSeleccionado.direccion.calle + " " + this.miLocalSeleccionado.direccion.numero + " " + this.miLocalSeleccionado.direccion.barrio)
    .then(data => 
    {

      var lng = data.results["0"].geometry.location.lng;
      var lng2:string  = data.results["0"].geometry.location.lng;
      var lat= data.results["0"].geometry.location.lat;
      this.obj.lat=lat;
      this.obj.lng=lng;
      var latlng = new google.maps.LatLng(lat,lng);
      var mapatext = new google.maps.Marker({position: latlng, animation: google.maps.Animation.DROP, title: "Escribiste"});
      mapatext.setMap(this.map);
    })
    .catch(error =>
    {
      console.log(error);
    });
  }
  
  /*DibujarRuta(marcador1, marcador2)
  {
    
    console.log("Dibujo la ruta");
    this.directionsService.route({
      origin: marcador1,
      destination: marcador2,
      travelMode: google.maps.TravelMode.WALKING
    }, (response, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        console.log(response);
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }*/

  /*marcar()
  {
    console.log(this.lugar);


    this.ws.getlatlng("Pueyrredon 900 banfield")
    .then(data => 
    {

      var lng = data.results["0"].geometry.location.lng;
      var lng2:string  = data.results["0"].geometry.location.lng;
      var lat= data.results["0"].geometry.location.lat;
      this.obj.lat=lat;
      this.obj.lng=lng;
      var latlng = new google.maps.LatLng(lat,lng);
      var mapatext = new google.maps.Marker({position: latlng, animation: google.maps.Animation.DROP, title: "Escribiste"});
      mapatext.setMap(this.map);
    })
    .catch(error =>
    {
      console.log(error);
    });
    
  }*/

}
