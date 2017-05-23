import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private parentRouter : Router) { }

  ngOnInit() {
  }

  volver()
  {   
    this.parentRouter.navigateByUrl('/login');
  }
}
