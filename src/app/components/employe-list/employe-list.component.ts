import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../../services/employe.service';
import { Employe } from '../../models/employe.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DepartementService } from '../../services/departement.service';
import { forkJoin } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employe-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent implements OnInit {
  employes: Employe[] = [];
  departementsMap: Map<number, string> = new Map();

  currentPage = 0;
  pageSize = 5;
  totalPages = 0;

  constructor(
    private employeService: EmployeService,
    private departementService: DepartementService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      employesPage: this.employeService.getEmployesPaginated(this.currentPage, this.pageSize),
      departementsMap: this.departementService.getDepartementsMap()
    }).subscribe({
      next: ({ employesPage, departementsMap }) => {
        this.employes = employesPage.content;
        this.totalPages = employesPage.totalPages;
        this.departementsMap = departementsMap;
      },
      error: (e) => console.error(e)
    });
  }

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
        error: (e) => console.error(e)
      });
    }
  }

  // Méthodes de navigation pour la pagination
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadData();
    }
  }
}