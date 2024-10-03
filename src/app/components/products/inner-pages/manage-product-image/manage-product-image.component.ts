import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../../service/product/product.service';
import { error } from 'console';
import { ProductImageService } from '../../../../service/product-image/product-image.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-product-image',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule],
  templateUrl: './manage-product-image.component.html',
  styleUrl: './manage-product-image.component.css'
})
export class ManageProductImageComponent {
  readonly dialogRef = inject(MatDialogRef<ManageProductImageComponent>);
  readonly productImageService = inject(ProductImageService);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  form = new FormGroup({
    image: new FormControl(null, Validators.required)
  });

  loading:boolean = false;

  image:any;

  selectedFile(event:Event){
    const inputFile = event.target as HTMLInputElement;
    if(inputFile.files && inputFile.files.length > 0){
      this.image = inputFile.files[0];
    }
  }



  onSubmit(event:Event){}

  close(){
    this.dialogRef.close(false);
  }

}
