import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  personas: FirebaseListObservable<any[]>;
  clientes : FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase,
              private Router : Router,
              private route: ActivatedRoute) {
    
    this.personas = db.list('/personas');
    //this.clientes = db.list('/clientes');

   }

   

  ngOnInit() {

  }

  eliminar(id)
  {
    console.log(id);
    this.personas.remove(id);
  }

  modificar(item)
  {
    this.Router.navigate(['/modificar', item.$key]);
  }

  locales()
  {
    this.Router.navigateByUrl('/locales');
  }

  login()
  {
    this.Router.navigateByUrl('/ofertas'); 
  }

  volver()
  {
    this.Router.navigateByUrl('/login'); 
  }

  abmLocal()
  {
    this.Router.navigateByUrl('/abm-local'); 
  }
}