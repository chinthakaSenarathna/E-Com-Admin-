import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  readonly userService = inject(UserService);

  constructor(private route:Router){}

  form = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    displayName: new FormControl('',[
      Validators.required
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6),
    ])
  })

  create(){
    if(this.form.valid){
      const obj = {
        email: this.form.value.email,
        displayName: this.form.value.displayName,
        password: this.form.value.password
      }

      this.userService.create(obj).subscribe(response => {
        this.route.navigateByUrl('/login');
        alert('please login')
        // console.log(response);
      }, error => {
        console.log(error?.error?.message);
      })

    }
    else{
      console.log("Form is invalid. Please fill in all required fields.");
      this.form.markAllAsTouched(); // This highlights any invalid fields
    }
  }

  reset(){
    this.form.reset();
  }
}
