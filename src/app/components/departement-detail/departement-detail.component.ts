import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartementService } from '../../services/departement.service';
import { Departement } from '../../models/departement.model';

@Component({
  selector: 'app-departement-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './departement-detail.component.html',
  styleUrl: './departement-detail.component.css'
})
export class DepartementDetailComponent implements OnInit {
  departement: Departement | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departementService: DepartementService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.departementService.getDepartementById(id).subscribe({
        next: (data) => this.departement = data,
        error: (e) => console.error(e)
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/departements']);
  }
}