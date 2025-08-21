import { Routes } from '@angular/router';
import { EmployeListComponent } from './components/employe-list/employe-list.component';
import { EmployeFormComponent } from './components/employe-form/employe-form.component';
import { EmployeDetailComponent } from './components/employe-detail/employe-detail.component';
import { DepartementListComponent } from './components/departement-list/departement-list.component';
import { DepartementFormComponent } from './components/departement-form/departement-form.component';
import { DepartementDetailComponent } from './components/departement-detail/departement-detail.component';
import { MissionListComponent } from './components/mission-list/mission-list.component';
import { MissionFormComponent } from './components/mission-form/mission-form.component';
import { MissionDetailComponent } from './components/mission-detail/mission-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/employes', pathMatch: 'full' },
  { path: 'employes', component: EmployeListComponent },
  { path: 'employes/create', component: EmployeFormComponent },
  { path: 'employes/update/:id', component: EmployeFormComponent },
  { path: 'employes/detail/:id', component: EmployeDetailComponent },
  { path: 'departements', component: DepartementListComponent },
  { path: 'departements/create', component: DepartementFormComponent },
  { path: 'departements/update/:id', component: DepartementFormComponent },
  { path: 'departements/detail/:id', component: DepartementDetailComponent },
  { path: 'missions', component: MissionListComponent },
  { path: 'missions/create', component: MissionFormComponent }, 
  { path: 'missions/update/:id', component: MissionFormComponent }, 
  { path: 'missions/detail/:id', component: MissionDetailComponent } 
];