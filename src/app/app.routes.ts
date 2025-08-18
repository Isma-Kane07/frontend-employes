import { Routes } from '@angular/router';
import { EmployeListComponent } from './components/employe-list/employe-list.component';
import { EmployeFormComponent } from './components/employe-form/employe-form.component';
import { EmployeDetailComponent } from './components/employe-detail/employe-detail.component';
import { DepartementListComponent } from './components/departement-list/departement-list.component';
import { DepartementFormComponent } from './components/departement-form/departement-form.component';
import { DepartementDetailComponent } from './components/departement-detail/departement-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/employes', pathMatch: 'full' },
  { path: 'employes', component: EmployeListComponent },
  { path: 'employes/create', component: EmployeFormComponent },
  { path: 'employes/update/:id', component: EmployeFormComponent },
  { path: 'employes/detail/:id', component: EmployeDetailComponent },
  { path: 'departements', component: DepartementListComponent },
  { path: 'departements/create', component: DepartementFormComponent },
  { path: 'departements/update/:id', component: DepartementFormComponent },
  { path: 'departements/detail/:id', component: DepartementDetailComponent }
];