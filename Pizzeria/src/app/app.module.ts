import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { LocalesComponent } from './locales/locales.component';
import { LocalSeleccionadoComponent } from './local-seleccionado/local-seleccionado.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ProductosComponent } from './productos/productos.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { AbmLocalComponent } from './abm-local/abm-local.component';
import { InfoPedidoComponent } from './info-pedido/info-pedido.component';

import { RouterModule, Routes } from '@angular/router';
//import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { ModificarComponent } from './modificar/modificar.component';

//SERVICIOS.
import { WsService }  from './services/ws/ws.service';
import { AutService } from './services/auth/aut.service';
import { VerificarJWTService } from './services/verificar-jwt/verificar-jwt.service';
//JSON WEB TOKEN.
import { JwtModule } from './jwt/jwt.module';
import { FileUploadModule } from "ng2-file-upload";
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';//AGREGADO ARCHIVOS

const appRoutes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'registro', component: RegistroComponent },
{ path: 'usuarios', component: UsuariosComponent },
{ path: 'modificar/:id', component: ModificarComponent },
{ path: 'locales', component: LocalesComponent },
{ path: 'ofertas/:local', component: OfertasComponent },
{ path: 'local-seleccionado/:local', component: LocalSeleccionadoComponent },
{ path: 'abm-local', component: AbmLocalComponent },
{ path: 'productos/:nombreLocal', component: ProductosComponent },
{ path: 'info-pedido', component: InfoPedidoComponent },
{ path: 'inicio', component: InicioComponent },
{ path: 'menu', component: MenuComponent }];

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDVis_7U93M6TQxP1Iyw2HXvnPD4nEeup8",
    authDomain: "tplab4.firebaseapp.com",
    databaseURL: "https://tplab4.firebaseio.com",
    projectId: "tplab4",
    storageBucket: "tplab4.appspot.com",
    messagingSenderId: "967233327244"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    LocalesComponent,
    LocalSeleccionadoComponent,
    EstadisticasComponent,
    ProductosComponent,
    OfertasComponent,
    UsuariosComponent,
    OperacionesComponent,
    AbmLocalComponent,
    InfoPedidoComponent,
    ModificarComponent,
    InicioComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),    
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    JwtModule,
    FileUploadModule //archivos/imagenes
  ],  
  providers: [WsService,AutService,VerificarJWTService],//AGREGO SERVICIOS.
  bootstrap: [AppComponent]
})
export class AppModule { }
