import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class WsService {


  constructor(public http: Http, private authHttp: AuthHttp)
  {

  }

  MoverFoto(foto)
  {
    //return this.http.get("http://localhost/api/index.php/mover/"+foto)
    return this.http.get("http://www.osmar.hol.es/index.php/mover/"+foto)
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }
  MoverFotoProducto(foto)
  {
    //return this.http.get("http://localhost/api/index.php/mover/producto/"+foto)
    return this.http.get("http://www.osmar.hol.es/index.php/mover/producto/"+foto)
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }
    EliminarFoto(foto)
  {
    //return this.http.get("http://localhost/api/index.php/eliminarfoto/"+foto)
    return this.http.get("http://www.osmar.hol.es/index.php/eliminarfoto/"+foto)
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }
     EliminarFotoProducto(foto)
  {
    //return this.http.get("http://localhost/api/index.php/eliminarfotoproducto/"+foto)
    return this.http.get("http://www.osmar.hol.es/index.php/eliminarfotoproducto/"+foto)
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }
  //-------------------------USUARIOS----------------------------------
  TraerUsuarios()
  {
    //return this.http.get("http://localhost/api/index.php/usuarios")
    return this.http.get("http://www.osmar.hol.es/index.php/usuarios")
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }
  AgregarUsuario(obj)
  {
    //return this.http.get("http://localhost/api/index.php/agregar/"+JSON.stringify(obj))
    return this.http.get("http://www.osmar.hol.es/index.php/agregar/"+JSON.stringify(obj))
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }
  ModificarUsuario(obj)
  {
    //return this.http.get("http://localhost/api/index.php/modificar/"+JSON.stringify(obj))
    return this.http.get("http://www.osmar.hol.es/index.php/modificar/"+JSON.stringify(obj))
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }
  EliminarUsuario(id)
  {
    //return this.http.get("http://localhost/api/index.php/eliminar/"+id)
    return this.http.get("http://www.osmar.hol.es/index.php/eliminar/"+id)
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }
  //---------------------------------------------------------------------
  //--------------------------JWT-----------------------------------------
    CrearToken(user: Object)//AGREGADO!
    {    
    var body = user;
    //return this.http.post('http://localhost/jwt2/index.php/login', body)//POR METODO POST!
    return this.http.post('http://localhost/ws/index.php/login', body)//POR METODO POST!
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }
  GetJwt()//AGREGADO...!
  {
    //return this.authHttp.get('http://localhost/jwt2/index.php/token')
    return this.authHttp.get('http://www.osmar.hol.es/index.php/token')
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }
  //----------------------------------------------------------------------
  getlatlng(address = 'Av Bartolomé Mitre 750,Avellaneda,Buenos Aires, Argentina'){

    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address)
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }

  getDireccion(lat, lng)
  {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng)
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }

  
  //------------------------PRODUCTOS------------------------------------
  TraerProductos()
  {
    //return this.http.get("http://localhost/api/index.php/productos")
    return this.http.get("http://www.osmar.hol.es/index.php/productos")
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }
  AgregarProducto(obj)
  {
    //return this.http.get("http://localhost/api/index.php/agregar/producto/"+JSON.stringify(obj))
    return this.http.get("http://www.osmar.hol.es/index.php/agregar/producto/"+JSON.stringify(obj))
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }
  EliminarProducto(id)
  {
    //return this.http.get("http://localhost/api/index.php/eliminar/producto/"+id)
    return this.http.get("http://www.osmar.hol.es/index.php/eliminar/producto/"+id)
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }
  //--------------------------------------------------------------------
  TraerLocales()
  {
    return this.http.get("http://www.osmar.hol.es/index.php/locales")
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }
  AgregarLocal(obj)
  {
    return this.http.get("http://www.osmar.hol.es/index.php/agregar/local/"+JSON.stringify(obj))
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }

  private extractData(res: Response) {
    let body = res.json();    
    
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error( errMsg );
    console.error( 'CATCH' );
    return Observable.throw(errMsg);
  }
}
