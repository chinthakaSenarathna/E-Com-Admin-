import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../../service/product/product.service';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteProductComponent>);
  readonly productService = inject(ProductService);

  delete(){
    this.productService.delete('').subscribe(response => {
      this.dialogRef.close(true);
    }, error => {
      console.log(error?.error?.message);
    })
  }

  close(){
    this.dialogRef.close(false);
  }

}
