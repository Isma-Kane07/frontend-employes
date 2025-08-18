import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartementService } from '../../services/departement.service';
import { Departement } from '../../models/departement.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-departement-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departement-form.component.html',
  styleUrl: './departement-form.component.css'
})
export class DepartementFormComponent implements OnInit {
  departement: Departement = { nomDepartment: '', taille: 0 };
  isEditing = false;

  constructor(
    private departementService: DepartementService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.departementService.getDepartementById(+id).subscribe({
        next: (data) => this.departement = data,
        error: (e) => console.error(e)
      });
    }
  }

  saveDepartement(): void {
    if (this.isEditing && this.departement.id) {
      this.departementService.updateDepartement(this.departement.id, this.departement).subscribe({
        next: () => this.router.navigate(['/departements']),
        error: (e) => console.error(e)
      });
    } else {
      this.departementService.createDepartement(this.departement).subscribe({
        next: () => this.router.navigate(['/departements']),
        error: (e) => console.error(e)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/departements']);
  }
}