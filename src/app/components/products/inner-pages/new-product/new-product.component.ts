import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../../../../service/product/product.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [MatDialogModule,ReactiveFormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {

  constructor(private productService:ProductService){}

  // model
  form = new FormGroup({
    qty: new FormControl(0,[Validators.required]),
    unitPrice: new FormControl(0,[Validators.required]),
    description: new FormControl('',[Validators.required])
  });

  create(){
    const obj = {
      qty: this.form.value.qty,
      unitPrice: this.form.value.unitPrice,
      description: this.form.value.description
    }

    this.productService.create(obj)
  }
}