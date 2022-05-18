import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['../app.component.css']
})
export class ProductAddComponent implements OnInit {
  prodData={
    sku:"",
    name:"",
    price:"",
    productType:"",
    size:"",
    height:"",
    width:"",
    length:"",
    weight:"",
  };

  windowHeight: number;

  constructor(private router: Router) { }

  ngOnInit() {
    this.windowHeight = window.innerHeight;
    document.getElementById('mainArea').style.height = this.windowHeight + 'px';
    document.getElementById('contentArea').style.height = (this.windowHeight - 162) + 'px';

    document.getElementById('DVD').style.display = "none";
    document.getElementById('Furniture').style.display = "none";
    document.getElementById('Book').style.display = "none";

    this.prodData.productType = '';
  }
  backToList(){
    this.router.navigate(['/productList']);
  }
  typeSwitcher(){
    if(this.prodData.productType === 'dvd') {
      document.getElementById('DVD').style.display = "block";
      document.getElementById('Furniture').style.display = "none";
      document.getElementById('Book').style.display = "none";
    } else if (this.prodData.productType === 'book') {
      document.getElementById('DVD').style.display = "none";
      document.getElementById('Furniture').style.display = "none";
      document.getElementById('Book').style.display = "block";
    } else if (this.prodData.productType === 'furniture') {
      document.getElementById('DVD').style.display = "none";
      document.getElementById('Furniture').style.display = "block";
      document.getElementById('Book').style.display = "none";
    } else {
      document.getElementById('DVD').style.display = "none";
      document.getElementById('Furniture').style.display = "none";
      document.getElementById('Book').style.display = "none";
    }
  }
}
