import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  create(obj:any):Observable<any>{
    return this.http.post(this.baseUrl + 'products',{
      qty: obj.qty,
      unitPrice: obj.unitPrice,
      description: obj.description
    });
  }

  update(obj:any, id:string):Observable<any>{
    return this.http.put(`${this.baseUrl+'products'}/${id}`, {
      qty: obj.qty,
      unitPrice: obj.unitPrice,
      description: obj.description
    });
  }

  delete(id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl+'products'}/${id}`);
  }

  getAll(searchText:any, page:any, size:any):Observable<any>{

    // create HttpParams object
    let params = new HttpParams()
      .set('searchText',searchText)
      .set('page', page)
      .set('size', size)

    return this.http.get(this.baseUrl + 'products' + '/list', { params: params });
  }
}
