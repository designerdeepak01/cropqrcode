import { Component, inject } from '@angular/core';
import { CommonService } from '../common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
 private service = inject(CommonService)
  allCategory:any[] = []
  ngOnInit() {
    this.service.allCategory().subscribe({
      next:(data)=>{
        if(data){
          this.allCategory = data
          
        }
      },
      error:(error)=>{

      }
    })
  }
  selectCategory(event:any){
    const value = event.target.value
    
    this.service.selectValue(value)
  }
}
