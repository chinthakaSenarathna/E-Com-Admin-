import { Component, Input } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-customer-status-manager',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './customer-status-manager.component.html',
  styleUrl: './customer-status-manager.component.css'
})
export class CustomerStatusManagerComponent {
  @Input() customer:any;
}
