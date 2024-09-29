import { Component, inject, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NewProductComponent } from './inner-pages/new-product/new-product.component';
import { UpdateProductComponent } from './inner-pages/update-product/update-product.component';
import { ManageProductImageComponent } from './inner-pages/manage-product-image/manage-product-image.component';
import { DeleteProductComponent } from './inner-pages/delete-product/delete-product.component';
import { ProductService } from '../../service/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  readonly productService = inject(ProductService);

  constructor(private matDialog:MatDialog){
  }

  products: any[] = []

  ngOnInit(): void {
      this.getAll();
  }

  // get all products
  getAll(){
    this.productService.getAll('',0,10).subscribe(response => {
      this.products = response;
      console.log(this.products);
    }, error => {
      console.log(error?.error?.manage);
    })
  }

  // add new product
  openNewProductForm(){
    let matDialogRef = this.matDialog.open(NewProductComponent,{
      width: '500px',
      disableClose: true
    });
  
    // after adding the new product, products page refresh
    matDialogRef.afterClosed().subscribe(response => {
      if(response){
        this.loadAllProducts();
      }
    });

  }


  loadAllProducts(){

  }

  
  // update product
  openUpdateProductForm(product:any){
    let matDialogRef = this.matDialog.open(UpdateProductComponent,{
      width: '500px',
      disableClose: true,
      // passed the data for update
      data: product
    });

    // after updated the product, product page refresh
    matDialogRef.afterClosed().subscribe(response => {
      if(response){
        this.loadAllProducts();
      }
    });

  }

  // manage product images
  manageProductImage(product:any){
    let matDialogRef = this.matDialog.open(ManageProductImageComponent,{
      width: '500px',
      disableClose: true,
      data: product
    });

    // after manage the product image, load all products
    matDialogRef.afterClosed().subscribe(response => {
      if(response){
        this.loadAllProducts();
      }
    });
  }

  // delete product
  openDeleteConfirmationForm(product:any){
    let matDialogRef = this.matDialog.open(DeleteProductComponent, {
      width: '500px',
      disableClose: true,
      data: product
    });

    // after delete the product, have to load all products
    matDialogRef.afterClosed().subscribe(response => {
      if(response){
        this.loadAllProducts();
      }
    })
  }
}
