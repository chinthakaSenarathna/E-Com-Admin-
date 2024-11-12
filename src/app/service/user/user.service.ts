import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  create(obj:any):Observable<any>{
    return this.http.post(this.baseUrl + 'users/visitor/signup',{
      email: obj.email,
      displayName: obj.displayName,
      password: obj.password
    });
  }
}
