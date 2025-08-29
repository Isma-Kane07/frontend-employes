import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MissionService } from '../../services/mission.service';
import { EmployeService } from '../../services/employe.service';
import { Mission } from '../../models/mission.model';
import { Employe } from '../../models/employe.model';

@Component({
  selector: 'app-mission-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mission-form.component.html',
  styleUrl: './mission-form.component.css'
})
export class MissionFormComponent implements OnInit {
  // Initialisation avec employeId car c'est ce que le DTO backend attend pour la liaison
  mission: Mission = { lieu: '', description: '', dateDebut: '', dateFin: '', employeId: 0 };
  employes: Employe[] = []; // Liste des employés pour le sélecteur
  isEditing = false;
  message = '';

  constructor(
    private missionService: MissionService,
    private employeService: EmployeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEmployes();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.missionService.getMissionById(+id).subscribe({
        next: (data) => {
          this.mission = data;
          // Assurez-vous que l'employeId est bien défini pour le formulaire
          // Si le backend renvoie un objet 'employe' complet, il faut extraire son ID
          if (this.mission.employe && this.mission.employe.id) {
            this.mission.employeId = this.mission.employe.id;
          }
          // Si employe est null/undefined, employeId doit rester tel quel (peut être 0 ou null)
        },
        error: (e) => console.error(e)
      });
    }
  }

  loadEmployes(): void {
    this.employeService.getAllEmployes().subscribe({
      next: (data) => this.employes = data,
      error: (e) => console.error(e)
    });
  }

  saveMission(): void {
    this.message = '';

    // Crée une copie de l'objet mission pour éviter de modifier l'original
    // et s'assurer que seuls les champs attendus par le DTO sont envoyés.
    const missionToSave: any = {
      id: this.mission.id,
      lieu: this.mission.lieu,
      description: this.mission.description,
      dateDebut: this.mission.dateDebut,
      dateFin: this.mission.dateFin,
      employeId: this.mission.employeId
    };

    if (this.isEditing) {
      if (missionToSave.id !== undefined) {
        this.missionService.updateMission(missionToSave.id, missionToSave as Mission).subscribe({
          next: () => {
            this.message = 'Mise à jour réussie !';
            this.router.navigate(['/missions']);
          },
          error: (e: HttpErrorResponse) => {
            console.error(e);
            this.message = e.error?.message || 'Une erreur est survenue lors de la mise à jour.';
          }
        });
      }
    } else {
      this.missionService.createMission(missionToSave as Mission).subscribe({
        next: () => {
          this.message = 'Création réussie !';
          this.router.navigate(['/missions']);
        },
        error: (e: HttpErrorResponse) => {
          console.error(e);
          this.message = e.error?.message || 'Une erreur est survenue lors de la création.';
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/missions']);
  }
}