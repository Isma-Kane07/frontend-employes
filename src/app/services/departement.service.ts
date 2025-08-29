import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Departement } from '../models/departement.model';
import { Page } from '../models/page.model';
import { Employe } from '../models/employe.model';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private apiUrl = 'http://localhost:8080/departements';

  constructor(private http: HttpClient) { }

  /**
   * Récupère tous les départements.
   * @returns Un Observable qui émet une liste de Departements.
   */
  getAllDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(this.apiUrl);
  }

  /**
   * Récupère une page de départements.
   * @param page Le numéro de la page.
   * @param size Le nombre d'éléments par page.
   * @returns Un Observable qui émet un objet Page de Departements.
   */
  getDepartementsPaginated(page: number, size: number): Observable<Page<Departement>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Departement>>(`${this.apiUrl}/paginated`, { params });
  }

  /**
   * Récupère la taille actuelle d'un département.
   * @param id L'ID du département.
   * @returns Un Observable qui émet la taille actuelle du département.
   */
  getTailleActuelle(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/taille-actuelle/${id}`);
  }

  /**
   * Récupère un département par son ID.
   * @param id L'ID du département.
   * @returns Un Observable qui émet un Departement.
   */
  getDepartementById(id: number): Observable<Departement> {
    return this.http.get<Departement>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crée un nouveau département.
   * @param departement L'objet département à créer.
   * @returns Un Observable qui émet le Departement créé.
   */
  createDepartement(departement: Departement): Observable<Departement> {
    return this.http.post<Departement>(`${this.apiUrl}/create`, departement);
  }

  /**
   * Met à jour un département existant.
   * @param id L'ID du département à mettre à jour.
   * @param departement L'objet département mis à jour.
   * @returns Un Observable qui émet le Departement mis à jour.
   */
  updateDepartement(id: number, departement: Departement): Observable<Departement> {
    return this.http.put<Departement>(`${this.apiUrl}/update/${id}`, departement);
  }

  /**
   * Supprime un département par son ID.
   * @param id L'ID du département à supprimer.
   * @returns Un Observable qui émet void.
   */
  deleteDepartement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  /**
   * Récupère une Map des départements (ID -> nom).
   * @returns Un Observable qui émet une Map des départements.
   */
  getDepartementsMap(): Observable<Map<number, string>> {
    return this.http.get<Departement[]>(this.apiUrl).pipe(
      map(departements => {
        const departementsMap = new Map<number, string>();
        departements.forEach(dep => {
          if (dep.id && dep.nomDepartment) {
            departementsMap.set(dep.id, dep.nomDepartment);
          }
        });
        return departementsMap;
      })
    );
  }

  /**
   * Récupère les employés d'un département.
   * @param departementId L'ID du département.
   * @returns Un Observable qui émet une liste d'Employes.
   */
  getEmployesByDepartement(departementId: number): Observable<Employe[]> {
    return this.http.get<Employe[]>(`${this.apiUrl}/${departementId}/employes`);
  }
}