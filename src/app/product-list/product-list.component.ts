import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ApiServiceService } from '../api-service.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['../app.component.css']
})
export class ProductListComponent implements OnInit {
  windowHeight: any;
  listProduct: any;
  massDeleteList: any;

  constructor(private router: Router, private apiService: ApiServiceService) { }

  ngOnInit() {
    this.windowHeight = window.innerHeight;
    this.massDeleteList = [];
    document.getElementById('mainAreaList').style.height = this.windowHeight + 'px';
    document.getElementById('contentAreaList').style.height = (this.windowHeight - 162) + 'px';

    this.apiService.listProduct()
    .subscribe
    (
      data => {
        this.listProduct = data;
      }
    );
    
  }
  naviagteToAddProduct(){
    this.router.navigate(['/add-product']);
  }
  checkCheckBoxvalue(event){
    if(event.checked === true){
      this.massDeleteList.push({'sku': event.source.id});
      console.log(this.massDeleteList)
    } else {
      this.massDeleteList = this.massDeleteList.filter(({ sku }) => sku !== event.source.id);
      console.log(this.massDeleteList)
    }
  }
  massDeleteConfirm(){
    document.getElementById('confirmDelete').style.visibility = "visible";
  }
  closeDelete(){
    document.getElementById('confirmDelete').style.visibility = "hidden";
  }
  closeFeedback(){
    document.getElementById('feedback').style.visibility = "hidden";
  }
  massDelete(){
    var dataSender: any;

    dataSender = this.massDeleteList;

    if(this.massDeleteList.length === 0){  
      this.closeDelete();
      document.getElementById('feedbackMsg').innerHTML = "Please select products to delete !";
      document.getElementById('feedback').style.visibility = "visible";
    } else {
      this.apiService.massDelete(dataSender)
      .subscribe
      (
        data => {
          this.closeDelete();
          this.apiService.listProduct()
          .subscribe
          (
            data => {
              this.listProduct = data;
            }
          );
        }
      )
    }

  
  }
}
