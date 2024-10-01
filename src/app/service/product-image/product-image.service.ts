import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  baseUrl = "http://localhost:8001/api/v1/product-images";

  constructor(private http:HttpClient) {}

  uploadProductImage(formData: FormData, id:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/${id}`, formData);
  }

}
