import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private http = inject(HttpClient)
  private selectSubject = new BehaviorSubject<any>(null)
  selectValue$ = this.selectSubject.asObservable()
  private _productCache$!: Observable<any>;
  constructor() { }

  getProduct() {
    console.log('API Hit');

    const limit = 10
    if (!this._productCache$) {

      this._productCache$ = this.http.get<any>(`https://dummyjson.com/products`).pipe(
        shareReplay(1)
      )
      return this._productCache$
    }
    return this._productCache$;
  }
  filteredProduct(category?: any) {
    if (!category) {
      return this.getProduct();  // cached
    }
    return this.http.get(`https://dummyjson.com/products/category/${category}`)
      .pipe(
        shareReplay(1)
      );

  }
  allCategory() {
    return this.http.get<any>('https://dummyjson.com/products').pipe(
      map(item => {
        const product = item.products
        const catetory = [...new Set(product.map((item: any) => item.category))]
        return catetory
      }
      )
    )
  }

 createUser(newUser: any) {
  return this.http.post('http://localhost:3000/users', newUser);
}
  selectValue(selectValue: any) {
    this.selectSubject.next(selectValue)
  }
}
