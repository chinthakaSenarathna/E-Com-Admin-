import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiemanagerService {

  constructor(private cookieService:CookieService) { }

  public set(token:string){
    this.cookieService.set('token',token,3);
  }

  public get():string{
    return this.cookieService.get('token');
  }

  public isExists():boolean{
    return this.cookieService.check('token')
  }

}
