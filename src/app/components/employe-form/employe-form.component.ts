import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { EmployeService } from '../../services/employe.service';
import { DepartementService } from '../../services/departement.service';
import { Employe } from '../../models/employe.model';
import { Departement } from '../../models/departement.model';
import { ActivatedRoute, Router } from '@angular/router'; 
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs'; 
import { map } from 'rxjs/operators';

// Pipe pour exclure l'employé en cours d'édition de la liste des chefs potentiels
@Pipe({
  name: 'excludeSelf',
  standalone: true
})
export class ExcludeSelfPipe implements PipeTransform {
  transform(employes: Employe[], currentEmployeId: number | undefined): Employe[] {
    if (!employes || !currentEmployeId) {
      return employes;
    }
    return employes.filter(employe => employe.id !== currentEmployeId);
  }
}

@Component({
  selector: 'app-employe-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ExcludeSelfPipe], 
  templateUrl: './employe-form.component.html',
  styleUrl: './employe-form.component.css'
})
export class EmployeFormComponent implements OnInit {
  employe: Employe = { 
    nom: '', 
    prenom: '', 
    noMatricule: '', 
    tel: '', 
    departement: undefined, 
    employeChef: undefined 
  };
  departements: Departement[] = [];
  isEditing = false;
  message = '';

  allEmployes: Employe[] = []; 
  employesChefsList: Employe[] = []; 

  constructor(
    private employeService: EmployeService,
    private departementService: DepartementService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDepartements();
    this.loadEmployes(); 
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.employeService.getEmployeById(+id).subscribe({
        next: (data) => {
          this.employe = data;
        },
        error: (e) => console.error(e)
      });
    }
  }

  loadDepartements(): void {
    this.departementService.getAllDepartements().subscribe({
      next: (data) => this.departements = data,
      error: (e) => console.error(e)
    });
  }

  loadEmployes(): void {
    this.employeService.getAllEmployes().subscribe({
      next: (data) => {
        this.allEmployes = data;
        // Filtrer pour n'obtenir que les employés qui ont le rôle 'EMPLOYE_CHEF'
        this.employesChefsList = this.allEmployes.filter(emp => emp.roles && emp.roles.includes('EMPLOYE_CHEF'));
      },
      error: (e) => console.error(e)
    });
  }

  compareDepartements(d1: Departement | undefined, d2: Departement | undefined): boolean {
    return d1 && d2 ? d1.id === d2.id : d1 === d2;
  }

  compareEmployes(e1: Employe | undefined, e2: Employe | undefined): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  saveEmploye(): void {
    this.message = ''; 
    
    const employeToSave: any = { ...this.employe };

    employeToSave.departementId = this.employe.departement ? this.employe.departement.id : null;
    employeToSave.employeChefId = this.employe.employeChef ? this.employe.employeChef.id : null;

    // Supprime les objets complets pour éviter les erreurs de sérialisation
    delete employeToSave.departement;
    delete employeToSave.employeChef;
    // Supprime les listes d'objets liées qui ne devraient pas être envoyées lors d'un PUT/POST d'employé
    delete employeToSave.subordonnes; 
    delete employeToSave.missions;
    delete employeToSave.roles; // Supprime les rôles car ils sont gérés côté backend

    if (this.isEditing) {
      if (this.employe.id !== undefined) {
        this.employeService.updateEmploye(this.employe.id, employeToSave as Employe).subscribe({
          next: () => {
            this.message = 'Mise à jour réussie !';
            this.router.navigate(['/employes']);
          },
          error: (e: HttpErrorResponse) => {
            console.error(e);
            if (e.status === 500 && e.error && e.error.message) {
              this.message = e.error.message;
            } else {
              this.message = 'Une erreur est survenue lors de la mise à jour.';
            }
          }
        });
      }
    } else {
      this.employeService.createEmploye(employeToSave as Employe).subscribe({
        next: () => {
          this.message = 'Création réussie !';
          this.router.navigate(['/employes']);
        },
        error: (e: HttpErrorResponse) => {
          console.error(e);
          if (e.status === 500 && e.error && e.error.message) {
            this.message = e.error.message; 
          } else {
            this.message = 'Une erreur est survenue lors de la création.';
          }
        }
      });
    }
  }
  
  cancel(): void {
    this.router.navigate(['/employes']);
  }
}