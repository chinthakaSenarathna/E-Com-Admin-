import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../../service/product/product.service';
import { error } from 'console';
import { ProductImageService } from '../../../../service/product-image/product-image.service';

@Component({
  selector: 'app-manage-product-image',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './manage-product-image.component.html',
  styleUrl: './manage-product-image.component.css'
})
export class ManageProductImageComponent {
  readonly dialogRef = inject(MatDialogRef<ManageProductImageComponent>);
  readonly productImageService = inject(ProductImageService);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  selectedFile: File | null = null;

  onFileSelected(event: Event):void{
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      this.selectedFile = input.files[0];
      console.log('selected file : ',this.selectedFile);
    }
  }

  onSubmit(event: Event):void{
    event.preventDefault();

    if(this.selectedFile){
      const formData = new FormData();
      formData.append('image',this.selectedFile);

      // console.log(this.selectedFile);
      // console.log(this.data.propertyId);

      this.productImageService.uploadProductImage(formData,this.data.propertyId).subscribe(response => {
        this.dialogRef.close(true);
      }, error => {
        console.log(error?.error?.message)
      });
    }
  }

  close(){
    this.dialogRef.close(false);
  }

}
