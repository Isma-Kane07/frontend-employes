import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { AuthResponse } from '../models/auth-response.model';
import { Employe } from '../models/employe.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  /**
   * Gère la connexion de l'utilisateur.
   * @param credentials Les informations d'identification de l'utilisateur.
   * @returns Un Observable qui émet l'objet AuthResponse.
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Stocke les informations de connexion dans le localStorage.
        localStorage.setItem('token', response.jwtToken);
        localStorage.setItem('username', response.username || '');
        localStorage.setItem('roles', JSON.stringify(response.roles || []));
        // Stocke l'employé associé si présent.
        if (response.employe) {
          localStorage.setItem('employe', JSON.stringify(response.employe));
        }
      })
    );
  }

  /**
   * Gère la déconnexion de l'utilisateur.
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    localStorage.removeItem('employe');
  }

  /**
   * Récupère le jeton JWT.
   * @returns Le jeton JWT ou null.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Vérifie si l'utilisateur est connecté.
   * @returns Vrai si l'utilisateur est connecté, sinon Faux.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Récupère les rôles de l'utilisateur.
   * @returns Un tableau de chaînes de caractères représentant les rôles.
   */
  getUserRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  /**
   * Récupère l'employé associé à l'utilisateur connecté.
   * @returns L'objet Employe ou null.
   */
  getLoggedInEmploye(): Employe | null {
    const employe = localStorage.getItem('employe');
    return employe ? JSON.parse(employe) : null;
  }
}
