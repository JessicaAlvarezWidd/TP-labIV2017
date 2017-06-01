import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  clientes: FirebaseListObservable<any[]>;


  constructor(private db: AngularFireDatabase,
              private Router : Router,
              private route: ActivatedRoute) {
    
    this.clientes = db.list('/clientes');

   }

   

  ngOnInit() {

  }

  eliminar(id)
  {
    console.log(id);
    this.clientes.remove(id);
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


}