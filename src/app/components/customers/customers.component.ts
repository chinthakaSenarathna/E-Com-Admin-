import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CustomerStatusManagerComponent } from './inner/customer-status-manager/customer-status-manager.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [MatIconModule, CustomerStatusManagerComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

}
