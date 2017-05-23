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

const appRoutes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'registro', component: RegistroComponent }];

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
    InfoPedidoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
