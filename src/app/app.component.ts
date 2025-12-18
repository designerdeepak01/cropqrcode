import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { TableComponent } from './table/table.component';
import { CropQRComponent } from './crop-qr/crop-qr.component';
@Component({
  selector: 'app-root',
  imports: [FilterComponent,TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'testproject';
 
}
