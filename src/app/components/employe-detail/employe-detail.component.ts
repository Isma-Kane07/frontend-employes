import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from '../../services/employe.service';
import { DepartementService } from '../../services/departement.service';
import { Employe } from '../../models/employe.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employe-detail.component.html',
  styleUrl: './employe-detail.component.css'
})
export class EmployeDetailComponent implements OnInit {
  employe: Employe | undefined;
  departementNom = 'Non assigné';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeService: EmployeService,
    private departementService: DepartementService
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
          if (this.employe.departementId) {
            this.getDepartementName(this.employe.departementId);
          }
        },
        error: (e) => console.error(e)
      });
    }
  }

  getDepartementName(departementId: number): void {
    this.departementService.getDepartementById(departementId).subscribe({
      next: (departement) => {
        this.departementNom = departement.nomDepartment;
      },
      error: (e) => console.error(e)
    });
  }

  goBack(): void {
    this.router.navigate(['/employes']);
  }
}