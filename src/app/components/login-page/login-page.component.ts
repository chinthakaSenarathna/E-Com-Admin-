import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { error } from 'console';
import { first } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  readonly userService = inject(UserService);

  constructor(private cookieService:CookieService){}

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
          console.log(data.headers.get('authorization'));
      }, error => {
        console.log(error?.error?.message);
      })
    }
  }

  reset(){
    this.form.reset();
  }

}
