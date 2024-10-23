import { Component, inject, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NewProductComponent } from './inner-pages/new-product/new-product.component';
import { UpdateProductComponent } from './inner-pages/update-product/update-product.component';
import { ManageProductImageComponent } from './inner-pages/manage-product-image/manage-product-image.component';
import { DeleteProductComponent } from './inner-pages/delete-product/delete-product.component';
import { ProductService } from '../../service/product/product.service';
import { GetAllProducts } from '../../interface/products/get-all-products';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ClipboardService } from '../../service/clipboard/clipboard.service';
import { ForexService } from '../../service/forex/forex.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatIconModule, CommonModule, ReactiveFormsModule, MatPaginatorModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  readonly productService = inject(ProductService);
  readonly clipboardService = inject(ClipboardService);
  // readonly forexService = inject(ForexService);

  constructor(private matDialog:MatDialog){
  }

  searchText = '';
  page:any = 0;
  size:any = 5;
  count:any = 0;
  // rate:any = 0;

  searchForm: FormGroup = new FormGroup({
    text: new FormControl('')
  });

  products: GetAllProducts | null = null;

  ngOnInit(): void {
    // this.forexService.exchange('USD','LKR').subscribe(response => {
    //   this.rate = response.result.LKR;
    //   console.log(this.rate);
    // });
    this.loadAllProducts();
    
    this.searchForm.valueChanges.pipe(debounceTime(1000)).subscribe(data => {
      this.searchText = data.text;
      this.loadAllProducts();
    });
  }

  // load the all products
  loadAllProducts(){
    this.productService.getAll(this.searchText,this.page,this.size).subscribe(response => {
      console.log(response);
      this.products = response;
      this.count = this.products?.object.count;
      // console.log(response);
    }, error => {
      console.log(error?.error?.message);
    })
  }

  getServerData(data:PageEvent){
    this.page = data?.pageIndex;
    this.size = data?.pageSize;
    this.loadAllProducts();
  }

  // copy content
  copyText(text:string){
    this.clipboardService.copy(text);
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
