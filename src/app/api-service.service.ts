import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { addProduct } from './classes/addProduct';

@Injectable()
export class ApiServiceService {

  // public ipAddress: any =  'http://localhost/scandy-be/api';
    public ipAddress: any =  'https://scandy-be.herokuapp.com/api';

  constructor(private httpclient: HttpClient) { }

  public listProduct(): Observable<any> {
        
    return this.httpclient.get(this.ipAddress + '/product/listProduct.php');
}
public massDelete(dataSender: any): Observable<any> {
  return this.httpclient.post(this.ipAddress + '/product/massDelete.php', dataSender);
}
public addProduct(dataSender: addProduct): Observable<any> {
  return this.httpclient.post(this.ipAddress + '/product/addProduct.php', dataSender);
}
}
