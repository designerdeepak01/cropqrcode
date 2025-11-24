import { Component, inject } from '@angular/core';
import { CommonService } from '../common.service';
import { CommonModule } from '@angular/common';
import { debounce, debounceTime, skip, switchMap } from 'rxjs';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  host:{ngSkipHydration:''}
})
export class TableComponent {
  private service = inject(CommonService)
  allData: any[] = []
  filteredData: any[] = []
  ngOnInit() {
    console.log('comp called');
    
    this.service.getProduct().subscribe({
      next: (data) => {
        console.log(data);
        if (data) {
          this.allData = data.products
          this.filteredData = this.allData
        }

      },
      error: (error) => {

      }
    }),
      this.service.selectValue$.pipe(
        skip(1),
        switchMap(catetory => this.service.filteredProduct(catetory))
      ).subscribe({
        next: (item: any) => {
          this.filteredData = item.products
        }
      })

  }

}
