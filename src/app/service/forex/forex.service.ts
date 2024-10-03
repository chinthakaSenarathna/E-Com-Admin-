import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForexService {
  apiKey = '6cef2a932a-3f3f5d1843-skryur';

  constructor(private http:HttpClient) { }

  public exchange(from:any, to:any):Observable<any>{
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    return this.http.get('https://api.fastforex.io/fetch-one?from='+from+'&to='+to+'&api_key='+this.apiKey, options);
  }

}
