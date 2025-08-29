import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../../services/employe.service';
import { Employe } from '../../models/employe.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DepartementService } from '../../services/departement.service'; // Réintroduit DepartementService
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs'; // Importe forkJoin

@Component({
  selector: 'app-employe-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent implements OnInit {
  employes: Employe[] = [];
  departementsMap: Map<number, string> = new Map(); // Réintroduit la map pour les noms des départements

  currentPage = 0;
  pageSize = 5;
  totalPages = 0;

  constructor(
    private employeService: EmployeService,
    private departementService: DepartementService // Réinjecte DepartementService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Utilise forkJoin pour charger les employés paginés et tous les départements en parallèle
    forkJoin({
      employesPage: this.employeService.getEmployesPaginated(this.currentPage, this.pageSize),
      departementsList: this.departementService.getAllDepartements() // Charge tous les départements
    }).subscribe({
      next: ({ employesPage, departementsList }) => {
        this.employes = employesPage.content;
        this.totalPages = employesPage.totalPages;

        // Construit la map des départements pour un accès rapide
        departementsList.forEach(dep => {
          if (dep.id && dep.nomDepartment) {
            this.departementsMap.set(dep.id, dep.nomDepartment);
          }
        });
      },
      error: (e) => console.error('Erreur lors du chargement des données des employés ou départements:', e)
    });
  }

  // Nouvelle méthode pour obtenir le nom complet du département à partir de la map
  getDepartementName(departementId: number | undefined): string {
    if (departementId === undefined) {
      return 'Non assigné';
    }
    return this.departementsMap.get(departementId) || 'Département inconnu';
  }

  deleteEmploye(id: number | undefined): void {
    if (id !== undefined) {
      this.employeService.deleteEmploye(id).subscribe({
        next: () => {
          console.log('Employé supprimé avec succès!');
          this.loadData();
        },
        error: (e) => console.error('Erreur lors de la suppression de l\'employé:', e)
      });
    }
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadData();
    }
  }
}