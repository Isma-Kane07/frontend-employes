import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../services/mission.service';
import { EmployeService } from '../../services/employe.service'; // Importez le service des employés
import { Mission } from '../../models/mission.model';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs'; // Importez forkJoin pour combiner les requêtes

@Component({
  selector: 'app-mission-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, DatePipe], 
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css']
})
export class MissionListComponent implements OnInit {
  missions: Mission[] = [];
  employesMap: Map<number, string> = new Map(); // Map pour stocker les noms des employés

  currentPage = 0;
  pageSize = 5;
  totalPages = 0;

  constructor(
    private missionService: MissionService,
    private employeService: EmployeService // Injectez le service des employés
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Utiliser forkJoin pour charger les missions et les employés en parallèle
    forkJoin({
      missionsPage: this.missionService.getMissionsPaginated(this.currentPage, this.pageSize),
      employesList: this.employeService.getAllEmployes() // Charge tous les employés
    }).subscribe({
      next: ({ missionsPage, employesList }) => {
        this.missions = missionsPage.content;
        this.totalPages = missionsPage.totalPages;

        // Construire la map des employés pour un accès rapide
        employesList.forEach(employe => {
          if (employe.id && employe.nom && employe.prenom) {
            this.employesMap.set(employe.id, `${employe.nom} ${employe.prenom}`);
          }
        });
      },
      error: (e) => console.error('Erreur lors du chargement des données:', e)
    });
  }

  // Nouvelle méthode pour obtenir le nom complet de l'employé à partir de la map
  getEmployeName(employeId: number | undefined): string {
    if (employeId === undefined) {
      return 'Non assigné';
    }
    return this.employesMap.get(employeId) || 'Employé inconnu';
  }

  deleteMission(id: number | undefined): void {
    if (id !== undefined) {
      this.missionService.deleteMission(id).subscribe({
        next: () => {
          console.log('Mission supprimée avec succès!');
          this.loadData();
        },
        error: (e) => console.error('Erreur lors de la suppression de la mission:', e)
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