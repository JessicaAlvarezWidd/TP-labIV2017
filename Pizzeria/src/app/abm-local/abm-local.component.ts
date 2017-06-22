import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-abm-local',
  templateUrl: './abm-local.component.html',
  styleUrls: ['./abm-local.component.css']
})
export class AbmLocalComponent implements OnInit {
  alertStylesEmail = {'border-color': ''};
  alertStylesPass = {'border-color': ''};
  condicion1 = true;
  condicion2 = true;
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
      "fotoUno" : "foto1",//this.local.fotoUno,
      "fotoDos" : "foto2",//""this.local.fotoUno,
      "fotoTres" : "foto3",//this.local.fotoUno,
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
    this.Router.navigateByUrl('/locales');
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
