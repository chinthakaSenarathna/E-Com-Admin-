import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductImageService } from '../../../../service/product-image/product-image.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-product-image',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, CommonModule],
  templateUrl: './manage-product-image.component.html',
  styleUrl: './manage-product-image.component.css'
})
export class ManageProductImageComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<ManageProductImageComponent>);
  readonly productImageService = inject(ProductImageService);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  ngOnInit(): void {
      console.log(this.data);
  }

  form = new FormGroup({
    image: new FormControl(null, Validators.required)
  });

  loading:boolean = false;

  image:any;

  selectedFile(event:Event){
    const inputFile = event.target as HTMLInputElement;
    // onnly can access, if not null
    this.image = inputFile.files?.[0];
    // file size validation
    if(this.isFileSizeValid(this.image)){
      if(this.isFileFormatValid(this.image)){
        // this.handleFile(this.image);
      }
      else{
        console.log("invalid format")
        this.image = null;
        inputFile.value = '';
        return;
      }
    }
    else{
      console.log("invalid file size");
      this.image = null;
      inputFile.value = '';
      return;
    }
  }

  // preview... the image
  handleFile(image:File):void{
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result;
    }

    reader.readAsDataURL(image);
  }

  isFileSizeValid(image:File):boolean{
    const maxSizeInByte = 5 * 1024 * 1024; // 5MB
    return image.size <= maxSizeInByte;
  }

  isFileFormatValid(image:File):boolean{
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'pdf'];
    const fileExtension = image.name.split('.').pop()?.toLowerCase();
    return fileExtension && allowedExtensions.includes(fileExtension) ? true : false;

  }

  onSubmit(){
    this.loading = true;
    const formData = new FormData();
    formData.append('image', this.image);
    this.productImageService.uploadProductImage(formData, this.data.propertyId).subscribe(response => {
      console.log(response);
      this.dialogRef.close(true);
      this.loading = false;
    },error => {
      console.log(error?.error?.message)
      this.loading = false;
    })
  }

  close(){
    this.dialogRef.close(false);
  }

}
