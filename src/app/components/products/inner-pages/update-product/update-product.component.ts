import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../../service/product/product.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<UpdateProductComponent>);
  readonly productService = inject(ProductService);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  form = new FormGroup({
    qty: new FormControl(0,[Validators.required]),
    unitPrice: new FormControl(0,[Validators.required]),
    description: new FormControl('',[Validators.required])
  });

  ngOnInit(): void {
      this.form.patchValue({
        qty: this.data.qty,
        unitPrice: this.data.unitPrice,
        description: this.data.description
      });
  }

  update(){
    const obj = {
      qty: this.form.value.qty,
      unitPrice: this.form.value.unitPrice,
      description: this.form.value.description
    }
    this.productService.update(obj,this.data.propertyId).subscribe(response => {
      this.dialogRef.close(true);
    }, error => {
      console.log(error?.error?.message);
    })

  }

  close(){
    this.dialogRef.close(false);
  }

}
