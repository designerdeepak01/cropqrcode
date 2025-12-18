import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';

export const routes: Routes = [
    {path:'table', component:TableComponent, loadComponent:()=> import('./table/table.component').then(c=>c.TableComponent)}
];
