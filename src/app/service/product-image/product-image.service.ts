import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) {}

  uploadProductImage(formData: FormData, id:any):Observable<any>{
    return this.http.post(`${this.baseUrl+'product-images'}/${id}`, formData);
  }

}
