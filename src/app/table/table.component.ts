import { Component, inject } from '@angular/core';
import { CommonService } from '../common.service';
import { CommonModule } from '@angular/common';
import { debounce, debounceTime, skip, switchMap } from 'rxjs';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  host: { ngSkipHydration: '' }
})
export class TableComponent {
  private service = inject(CommonService)
  allData: any[] = []
  filteredData: any[] = []
  ngOnInit() {
    console.log('comp called');

    this.service.getProduct().subscribe({
      next: (data) => {
        console.log('data loaded',data);
        if (data) {
          // this.allData =  Object.values(data[0])
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

  createUser() {
const users = [];

for (let i = 1; i <= 20000; i++) {
  users.push({
    id: i,
    name: `User ${i}`,
    email: `user${i}@test.com`,
    age: Math.floor(Math.random() * 60) + 18,
    status: i % 2 === 0 ? "Active" : "Inactive"
  });
}
if(users){

  this.service.createUser(users).subscribe(res => {
    console.log('User Created:', res);
  });
}
}

trackByUserId(index:number, user:any){
  return user.id
}

}
