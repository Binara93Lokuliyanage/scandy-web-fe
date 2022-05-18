import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['../app.component.css']
})
export class ProductListComponent implements OnInit {
  windowHeight: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.windowHeight = window.innerHeight;
    document.getElementById('mainAreaList').style.height = this.windowHeight + 'px';
    document.getElementById('contentAreaList').style.height = (this.windowHeight - 162) + 'px';
    
  }
  naviagteToAddProduct(){
    this.router.navigate(['/add-product']);
  }

}
