// src/app/components/mission-form/mission-form.component.ts

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
  // Initialisation des dates avec des chaînes de caractères vides
  mission: Mission = { lieu: '', description: '', dateDebut: '', dateFin: '', employeId: 0 };
  employes: Employe[] = [];
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
        next: (data) => this.mission = data,
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

    if (this.isEditing) {
      if (this.mission.id !== undefined) {
        // Passe l'objet mission directement au service
        this.missionService.updateMission(this.mission.id, this.mission).subscribe({
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
      // Passe l'objet mission directement au service
      this.missionService.createMission(this.mission).subscribe({
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