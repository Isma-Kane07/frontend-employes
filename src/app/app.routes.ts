import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

import { EmployeListComponent } from './components/employe-list/employe-list.component';
import { EmployeFormComponent } from './components/employe-form/employe-form.component';
import { EmployeDetailComponent } from './components/employe-detail/employe-detail.component';
import { DepartementListComponent } from './components/departement-list/departement-list.component';
import { DepartementFormComponent } from './components/departement-form/departement-form.component';
import { DepartementDetailComponent } from './components/departement-detail/departement-detail.component';
import { MissionListComponent } from './components/mission-list/mission-list.component';
import { MissionFormComponent } from './components/mission-form/mission-form.component';
import { MissionDetailComponent } from './components/mission-detail/mission-detail.component';
import { ParametresComponent } from './components/parametres/parametres.component';

export const routes: Routes = [
  // Route publique
  { path: 'login', component: LoginComponent },

  // Redirection par défaut
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Routes protégées
  { path: 'employes', component: EmployeListComponent, canActivate: [AuthGuard] },
  { path: 'employes/create', component: EmployeFormComponent, canActivate: [AuthGuard] },
  { path: 'employes/update/:id', component: EmployeFormComponent, canActivate: [AuthGuard] },
  { path: 'employes/detail/:id', component: EmployeDetailComponent, canActivate: [AuthGuard] },

  { path: 'departements', component: DepartementListComponent, canActivate: [AuthGuard] },
  { path: 'departements/create', component: DepartementFormComponent, canActivate: [AuthGuard] },
  { path: 'departements/update/:id', component: DepartementFormComponent, canActivate: [AuthGuard] },
  { path: 'departements/detail/:id', component: DepartementDetailComponent, canActivate: [AuthGuard] },

  { path: 'missions', component: MissionListComponent, canActivate: [AuthGuard] },
  { path: 'missions/create', component: MissionFormComponent, canActivate: [AuthGuard] },
  { path: 'missions/update/:id', component: MissionFormComponent, canActivate: [AuthGuard] },
  { path: 'missions/detail/:id', component: MissionDetailComponent, canActivate: [AuthGuard] },

    { path: 'parametres', component: ParametresComponent, canActivate: [AuthGuard] },

];
