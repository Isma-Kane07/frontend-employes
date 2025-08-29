import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MissionService } from '../../services/mission.service';
import { EmployeService } from '../../services/employe.service'; // Réintroduit EmployeService
import { Mission } from '../../models/mission.model';
import { Employe } from '../../models/employe.model';

@Component({
  selector: 'app-mission-detail',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './mission-detail.component.html',
  styleUrl: './mission-detail.component.css'
})
export class MissionDetailComponent implements OnInit {
  mission: Mission | undefined;
  employe: Employe | undefined; // Conserve cette propriété pour stocker les détails de l'employé

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private missionService: MissionService,
    private employeService: EmployeService // Réinjecte EmployeService
  ) { }

  ngOnInit(): void {
    this.getMission();
  }

  getMission(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.missionService.getMissionById(id).subscribe({
        next: (data) => {
          this.mission = data;
          // Si mission.employeId est présent, récupère les détails de l'employé
          if (this.mission.employeId) {
            this.getEmployeDetails(this.mission.employeId);
          }
        },
        error: (e) => console.error(e)
      });
    }
  }

  getEmployeDetails(employeId: number): void {
    this.employeService.getEmployeById(employeId).subscribe({
      next: (employe) => {
        this.employe = employe;
      },
      error: (e) => console.error(e)
    });
  }

  goBack(): void {
    this.router.navigate(['/missions']);
  }
}