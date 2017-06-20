import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-abm-local',
  templateUrl: './abm-local.component.html',
  styleUrls: ['./abm-local.component.css']
})
export class AbmLocalComponent implements OnInit {

  locales: FirebaseListObservable<any[]>;

    local = {nombre : "",
            fotoUno : "foto1Local",
            fotoDos: "foto2Local",
            fotoTres : "foto3Local",
            direccion : {
              calle : "",
              numero : "",
              barrio : ""}
            
          };

  constructor(private db: AngularFireDatabase,
              private Router : Router) {

                 this.locales = this.db.list('/locales');

   }

  ngOnInit() {
  }

  aceptar()
  {
    this.locales.update(this.local.nombre,{
      "fotoUno" : this.local.fotoUno,
      "fotoDos" : this.local.fotoUno,
      "fotoTres" : this.local.fotoUno,
      "nombre" : this.local.nombre,
      "direccion" : {
        "barrio" : this.local.direccion.barrio,
        "calle" : this.local.direccion.calle,
        "numero" : this.local.direccion.numero
      }/*,
      "ofertas" : {
          "ninguno" : {
            "nombre" : "ninguno"
            
          }
        },
      "productos" : {
        "ninguno" : {          
          "nombre" : "ninguno"
          
        }
      }*/
    });

    this.Router.navigate(['/local-seleccionado', this.local.nombre]);
  }

  cancelar()
  {
    this.Router.navigateByUrl('/usuarios');
  }

  

}
