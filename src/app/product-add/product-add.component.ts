import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';
import { ApiServiceService } from '../api-service.service';
import { addProduct } from '../classes/addProduct';


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

  constructor(private router: Router, private apiService: ApiServiceService) { }

  ngOnInit() {
    this.windowHeight = window.innerHeight;
    document.getElementById('mainArea').style.height = this.windowHeight + 'px';
    document.getElementById('contentArea').style.height = (this.windowHeight - 162) + 'px';

    document.getElementById('DVD').style.display = "none";
    document.getElementById('Furniture').style.display = "none";
    document.getElementById('Book').style.display = "none";

    this.prodData.productType = '';

    var priceBox = document.getElementById("price");
    var sizeBox = document.getElementById("size");
    var weighteBox = document.getElementById("weight");
    var heightBox = document.getElementById("height");
    var lengthBox = document.getElementById("length");
    var widthBox = document.getElementById("width");

    // preventing input e, -, +

    var invalidChars = [
      "-",
      "+",
      "e",
];

priceBox.addEventListener("keydown", function(e) {
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
});

sizeBox.addEventListener("keydown", function(e) {
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
});

weighteBox.addEventListener("keydown", function(e) {
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
});

heightBox.addEventListener("keydown", function(e) {
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
});

lengthBox.addEventListener("keydown", function(e) {
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
});

widthBox.addEventListener("keydown", function(e) {
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
});

  }
  backToList(){
    this.router.navigate(['/productList']);
  }
  typeSwitcher(){
    if(this.prodData.productType === 'DVD') {
      document.getElementById('DVD').style.display = "block";
      document.getElementById('Furniture').style.display = "none";
      document.getElementById('Book').style.display = "none";
    } else if (this.prodData.productType === 'Book') {
      document.getElementById('DVD').style.display = "none";
      document.getElementById('Furniture').style.display = "none";
      document.getElementById('Book').style.display = "block";
    } else if (this.prodData.productType === 'Furniture') {
      document.getElementById('DVD').style.display = "none";
      document.getElementById('Furniture').style.display = "block";
      document.getElementById('Book').style.display = "none";
    } else {
      document.getElementById('DVD').style.display = "none";
      document.getElementById('Furniture').style.display = "none";
      document.getElementById('Book').style.display = "none";
    }
  }
  closeNoti(){
    document.getElementById('notification').style.visibility = "hidden"
  }
  addProductValidator(){
    var price = (this.prodData.price).toString()
    var priceCents;
    if (price.includes('.')) {
      
      priceCents = console.log(price.split('.')[1].length)
   }

    if(this.prodData.sku === null || this.prodData.sku === ''){
      document.getElementById('notificationMsg').innerHTML = "Please submit sku !"
      document.getElementById('notification').style.visibility = "visible"
    } else if(this.prodData.name === null || this.prodData.name === ''){
      document.getElementById('notificationMsg').innerHTML = "Please submit name !"
      document.getElementById('notification').style.visibility = "visible"
    } else if(this.prodData.price === null || this.prodData.price === ''){
      document.getElementById('notificationMsg').innerHTML = "Please submit price !"
      document.getElementById('notification').style.visibility = "visible"
    } else if(this.prodData.productType === null || this.prodData.productType === ''){
      document.getElementById('notificationMsg').innerHTML = "Please select product type !"
      document.getElementById('notification').style.visibility = "visible"
    } else if (priceCents > 2) {
      document.getElementById('notificationMsg').innerHTML = "Please provide the price of indicated type (xxxx.xx) !"
      document.getElementById('notification').style.visibility = "visible"
    } else {
      if(this.prodData.productType === 'DVD'){
        if(this.prodData.size === null || this.prodData.size === ''){
          document.getElementById('notificationMsg').innerHTML = "Please submit size !"
          document.getElementById('notification').style.visibility = "visible"
        } else {
          this.addProduct()
        }
      } else if(this.prodData.productType === 'Book'){
        if(this.prodData.weight === null || this.prodData.weight === ''){
          document.getElementById('notificationMsg').innerHTML = "Please submit weight !"
          document.getElementById('notification').style.visibility = "visible"
        } else {
          this.addProduct()
        }
      } else {
        if(this.prodData.height === null || this.prodData.height === ''){
          document.getElementById('notificationMsg').innerHTML = "Please submit height !"
          document.getElementById('notification').style.visibility = "visible"
        } else if(this.prodData.length === null || this.prodData.length === ''){
          document.getElementById('notificationMsg').innerHTML = "Please submit length !"
          document.getElementById('notification').style.visibility = "visible"
        } else if(this.prodData.width === null || this.prodData.width === '') {
          document.getElementById('notificationMsg').innerHTML = "Please submit width !"
          document.getElementById('notification').style.visibility = "visible"
        } else {
          this.addProduct()
        }
      }
    }
  }
  addProduct(){
    const dataSender = new addProduct();

    dataSender.sku = this.prodData.sku;
    dataSender.name = this.prodData.name;
    dataSender.price =( parseFloat(this.prodData.price)).toFixed(2);
    dataSender.type = this.prodData.productType;
    dataSender.size = this.prodData.size;
    dataSender.weight = this.prodData.weight;
    dataSender.height = this.prodData.height;
    dataSender.length = this.prodData.length;
    dataSender.width = this.prodData.width;

  this.apiService.addProduct(dataSender)
  .subscribe
  (
    data => {
      if(data.status === true){
        this.router.navigate(['/productList']);
      } else {
        document.getElementById('notificationMsg').innerHTML = "sku is already exist !"
        document.getElementById('notification').style.visibility = "visible"
      }
    }
  )
  }
}
