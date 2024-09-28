import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NewProductComponent } from './inner-pages/new-product/new-product.component';
import { UpdateProductComponent } from './inner-pages/update-product/update-product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  constructor(private matDialog:MatDialog){
  }

  openNewProductForm(){
    this.matDialog.open(NewProductComponent,{
      width: '500px',
      disableClose: true
    });
  }

  openUpdateProductForm(){
    this.matDialog.open(UpdateProductComponent,{
      width: '500px',
      disableClose: true
    })
  }
}
