import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
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

  signup(){
    if(this.form.valid){
      console.log(this.form);
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
