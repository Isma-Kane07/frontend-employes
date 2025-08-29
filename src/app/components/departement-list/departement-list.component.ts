import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DepartementService } from '../../services/departement.service';
import { Departement } from '../../models/departement.model';
import { Page } from '../../models/page.model';
import { forkJoin, map, Observable } from 'rxjs'; // Importez map, forkJoin et Observable

@Component({
  selector: 'app-departement-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './departement-list.component.html',
  styleUrl: './departement-list.component.css'
})
export class DepartementListComponent implements OnInit {
  departements: Departement[] = [];
  tailleActuelleMap: Map<number, number> = new Map();
  currentPage = 0;
  pageSize = 5;
  totalPages = 0;

  constructor(private departementService: DepartementService) { }

  ngOnInit(): void {
    this.loadDepartements();
  }

  loadDepartements(): void {
    this.departementService.getDepartementsPaginated(this.currentPage, this.pageSize).subscribe({
      next: (data: Page<Departement>) => {
        this.departements = data.content;
        this.totalPages = data.totalPages;
        
        // Créer un tableau d'observables pour chaque appel de taille actuelle
        const tailleObservables: Observable<{ id: number | undefined, taille: number }>[] = this.departements.map(dep => 
          this.departementService.getTailleActuelle(dep.id!).pipe(
            map(taille => ({ id: dep.id, taille: taille }))
          )
        );

        // Utiliser forkJoin pour lancer tous les appels en parallèle
        if (tailleObservables.length > 0) { // Ne pas appeler forkJoin sur un tableau vide
          forkJoin(tailleObservables).subscribe({
            next: (tailles) => {
              this.tailleActuelleMap.clear();
              tailles.forEach(item => {
                if (item.id) {
                  this.tailleActuelleMap.set(item.id, item.taille);
                }
              });
            },
            error: (e) => console.error('Erreur lors du chargement des tailles actuelles:', e)
          });
        } else {
          this.tailleActuelleMap.clear(); // Si aucun département, vide la map
        }
      },
      error: (e) => console.error('Erreur lors du chargement des départements paginés:', e)
    });
  }

  deleteDepartement(id: number | undefined): void {
    if (id !== undefined) {
      this.departementService.deleteDepartement(id).subscribe({
        next: () => {
          console.log('Département supprimé avec succès!');
          this.loadDepartements();
        },
        error: (e) => console.error('Erreur lors de la suppression du département:', e)
      });
    }
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadDepartements();
    }
  }
}