import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from '../models/employe.model';
import { Page } from '../models/page.model';
import { Departement } from '../models/departement.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private apiUrl = 'http://localhost:8080/employes';

  constructor(private http: HttpClient) { }

  /**
   * Récupère tous les employés.
   * @returns Un Observable qui émet une liste d'Employes.
   */
  getAllEmployes(): Observable<Employe[]> {
    return this.http.get<Employe[]>(this.apiUrl);
  }

  /**
   * Récupère une page d'employés.
   * @param page Le numéro de la page.
   * @param size Le nombre d'éléments par page.
   * @returns Un Observable qui émet un objet Page d'Employes.
   */
  getEmployesPaginated(page: number, size: number): Observable<Page<Employe>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Employe>>(`${this.apiUrl}/paginated`, { params });
  }

  /**
   * Récupère un employé par son ID.
   * @param id L'ID de l'employé.
   * @returns Un Observable qui émet un Employe.
   */
  getEmployeById(id: number): Observable<Employe> {
    return this.http.get<Employe>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crée un nouvel employé.
   * @param employe L'objet employé à créer.
   * @returns Un Observable qui émet l'Employe créé.
   */
  createEmploye(employe: Employe): Observable<Employe> {
    return this.http.post<Employe>(`${this.apiUrl}/create`, employe);
  }

  /**
   * Met à jour un employé existant.
   * @param id L'ID de l'employé à mettre à jour.
   * @param employe L'objet employé mis à jour.
   * @returns Un Observable qui émet l'Employe mis à jour.
   */
  updateEmploye(id: number, employe: Employe): Observable<Employe> {
    return this.http.put<Employe>(`${this.apiUrl}/update/${id}`, employe);
  }

  /**
   * Supprime un employé par son ID.
   * @param id L'ID de l'employé à supprimer.
   * @returns Un Observable qui émet void.
   */
  deleteEmploye(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  /**
   * Récupère le chef d'un employé.
   * @param employeId L'ID de l'employé.
   * @returns Un Observable qui émet l'Employe chef.
   */
  getEmployeChef(employeId: number): Observable<Employe> {
    return this.http.get<Employe>(`${this.apiUrl}/${employeId}/chef`);
  }
}
