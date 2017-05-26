import { Component } from '@angular/core';
import {Router} from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  clientes: FirebaseListObservable<any[]>;


  constructor(private parentRouter : Router,
              private db: AngularFireDatabase){
    this.clientes = db.list('/clientes');
    //console.log(this.clientes);
    this.clientes.subscribe(user=>{console.log(user)});

    

    this.parentRouter.navigateByUrl('/login');

  }

  
}

class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {

    peso = 5;

    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering..." + this.peso);
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
