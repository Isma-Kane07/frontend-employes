import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from '../../services/employe.service';
import { DepartementService } from '../../services/departement.service'; // Importez DepartementService
import { Employe } from '../../models/employe.model';
import { Departement } from '../../models/departement.model';

@Component({
  selector: 'app-employe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employe-detail.component.html', // Point vers le fichier HTML séparé
  styleUrl: './employe-detail.component.css'
})
export class EmployeDetailComponent implements OnInit {
  employe: Employe | undefined;
  departementDetail: Departement | undefined; // Pour stocker l'objet Departement complet
  employeChefDetail: Employe | undefined; // Pour stocker l'objet EmployeChef complet

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeService: EmployeService,
    private departementService: DepartementService // Injectez DepartementService
  ) { }

  ngOnInit(): void {
    this.getEmploye();
  }

  getEmploye(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.employeService.getEmployeById(id).subscribe({
        next: (data) => {
          this.employe = data;

          // Récupérer les détails du département si departementId est présent
          if (this.employe.departementId) {
            this.departementService.getDepartementById(this.employe.departementId).subscribe({
              next: (depData) => this.departementDetail = depData,
              error: (e) => console.error('Erreur lors du chargement du département:', e)
            });
          }

          // Récupérer les détails du chef d'équipe si employeChefId est présent
          if (this.employe.employeChefId) {
            this.employeService.getEmployeById(this.employe.employeChefId).subscribe({
              next: (chefData) => this.employeChefDetail = chefData,
              error: (e) => console.error('Erreur lors du chargement du chef d\'équipe:', e)
            });
          }
        },
        error: (e) => console.error('Erreur lors du chargement de l\'employé:', e)
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/employes']);
  }
}