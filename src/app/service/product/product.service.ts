import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:8001/api/v1/products';

  constructor(private http:HttpClient) { }

  create(obj:any):Observable<any>{
    return this.http.post(this.baseUrl,{
      qty: obj.qty,
      unitPrice: obj.unitPrice,
      description: obj.description
    });
  }

  update(obj:any, id:string):Observable<any>{
    return this.http.put(`${this.baseUrl}/${id}`, {
      qty: obj.qty,
      unitPrice: obj.unitPrice,
      description: obj.description
    });
  }

  delete(id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAll(searchText:string, page:number, size:number):Observable<any>{

    // create HttpParams object
    let params = new HttpParams()
      .set('searchText',searchText)
      .set('page', page)
      .set('size', size)

    return this.http.get(this.baseUrl + '/list', { params });
  }
}
