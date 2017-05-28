import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Router} from '@angular/router';
@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesComponent implements OnInit {

  locales: FirebaseListObservable<any[]>;

  constructor(private Router : Router,
              private db: AngularFireDatabase) {

                this.locales = db.list('/locales');
                this.locales.subscribe(user=>{console.log(user)});

  }

  ngOnInit() {
  }

}
