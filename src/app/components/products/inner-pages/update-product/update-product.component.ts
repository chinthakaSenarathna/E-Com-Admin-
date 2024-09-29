import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../../service/product/product.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  readonly dialogRef = inject(MatDialogRef<UpdateProductComponent>);
  readonly productService = inject(ProductService)

  form = new FormGroup({
    qty: new FormControl(0,[Validators.required]),
    unitPrice: new FormControl(0,[Validators.required]),
    description: new FormControl('',[Validators.required])
  });

  update(){
    const obj = {
      qty: this.form.value.qty,
      unitPrice: this.form.value.unitPrice,
      description: this.form.value.description
    }
    this.productService.update(obj,'7104f48f-24d3-4f18-839e-f7495b514508').subscribe(response => {
      this.dialogRef.close(true);
    }, error => {
      console.log(error?.error?.message);
    })

  }

  close(){
    this.dialogRef.close(false);
  }

}
