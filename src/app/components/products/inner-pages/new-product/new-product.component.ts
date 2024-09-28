import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
}
