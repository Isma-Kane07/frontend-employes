import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { EmployeService } from '../../services/employe.service';
import { DepartementService } from '../../services/departement.service';
import { Employe } from '../../models/employe.model';
import { Departement } from '../../models/departement.model';
import { ActivatedRoute, Router } from '@angular/router'; 
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employe-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employe-form.component.html',
  styleUrl: './employe-form.component.css'
})
export class EmployeFormComponent implements OnInit {
  employe: Employe = { nom: '', prenom: '', noMatricule: '', tel: '' };
  departements: Departement[] = [];
  isEditing = false;
  message = '';


  constructor(
    private employeService: EmployeService,
    private departementService: DepartementService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDepartements();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.employeService.getEmployeById(+id).subscribe({
        next: (data) => this.employe = data,
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

  saveEmploye(): void {
    this.message = ''; // Réinitialise le message avant de sauvegarder
    
    if (this.isEditing) {
      if (this.employe.id !== undefined) {
        this.employeService.updateEmploye(this.employe.id, this.employe).subscribe({
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
      this.employeService.createEmploye(this.employe).subscribe({
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