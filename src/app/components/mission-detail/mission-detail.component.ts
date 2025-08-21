import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MissionService } from '../../services/mission.service';
import { EmployeService } from '../../services/employe.service';
import { Mission } from '../../models/mission.model';
import { Employe } from '../../models/employe.model';

@Component({
  selector: 'app-mission-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mission-detail.component.html',
  styleUrl: './mission-detail.component.css'
})
export class MissionDetailComponent implements OnInit {
  mission: Mission | undefined;
  employe: Employe | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private missionService: MissionService,
    private employeService: EmployeService
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