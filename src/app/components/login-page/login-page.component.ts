import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { error } from 'console';
import { first } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CookiemanagerService } from '../../service/cookie/cookiemanager.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  readonly userService = inject(UserService);

  constructor(private router:Router,private cookieManagerService:CookiemanagerService){}

  form = new FormGroup({
    username: new FormControl("",[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("",[
      Validators.required,
      Validators.minLength(6)
    ])
  });

  login(){
    if(this.form.valid){
      const obj = {
        username: this.form.value.username,
        password: this.form.value.password
      }

      this.userService.login(obj)
        .pipe(first())
        .subscribe((data:HttpResponse<any>) => {
          console.log(data.headers.get('Authorization'));
          this.cookieManagerService.set(data?.headers?.get('Authorization')!);
          this.router.navigateByUrl('/dashboard');
      }, error => {
        console.log(error?.error?.message);
      })
    }
  }

  reset(){
    this.form.reset();
  }

}
