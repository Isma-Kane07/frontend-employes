import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './services/auth.service'; // Importez le service d'authentification mis à jour

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'gestion-employe-frontend';

  constructor(
    private router: Router,
    private authService: AuthService // Injectez AuthService
  ) {}

  ngOnInit(): void {
    // Vérification initiale pour la redirection
    if (this.authService.isLoggedIn()) {
      // Si l'utilisateur est connecté et essaie d'accéder à la page de connexion, redirigez-le.
      if (this.router.url === '/login') {
        this.router.navigate(['/employes']); // Ou votre page d'accueil par défaut
      }
    } else {
      // Si l'utilisateur n'est pas connecté et n'est pas sur la page de connexion, redirigez-le vers la connexion.
      if (this.router.url !== '/login') {
        this.router.navigate(['/login']);
      }
    }
  }

  // La sidebar s'affiche si l'utilisateur est connecté ET n'est pas sur la page de connexion
  showSidebar(): boolean {
    return this.authService.isLoggedIn() && !this.router.url.includes('/login');
  }

  // Méthode de déconnexion
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirige vers la page de connexion après déconnexion
  }
}
