import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from '../models/mission.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private apiUrl = 'http://localhost:8080/missions';

  constructor(private http: HttpClient) { }

  /**
   * Récupère toutes les missions.
   * @returns Un Observable qui émet une liste de Missions.
   */
  getAllMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.apiUrl);
  }

  /**
   * Récupère une page de missions.
   * @param page Le numéro de la page.
   * @param size Le nombre d'éléments par page.
   * @returns Un Observable qui émet un objet Page de Missions.
   */
  getMissionsPaginated(page: number, size: number): Observable<Page<Mission>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Mission>>(`${this.apiUrl}/paginated`, { params });
  }

  /**
   * Récupère une mission par son ID.
   * @param id L'ID de la mission.
   * @returns Un Observable qui émet une Mission.
   */
  getMissionById(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crée une nouvelle mission.
   * @param mission L'objet mission à créer.
   * @returns Un Observable qui émet la Mission créée.
   */
  createMission(mission: Mission): Observable<Mission> {
    return this.http.post<Mission>(`${this.apiUrl}/create`, mission);
  }

  /**
   * Met à jour une mission existante.
   * @param id L'ID de la mission à mettre à jour.
   * @param mission L'objet mission mis à jour.
   * @returns Un Observable qui émet la Mission mise à jour.
   */
  updateMission(id: number, mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${this.apiUrl}/update/${id}`, mission);
  }

  /**
   * Supprime une mission par son ID.
   * @param id L'ID de la mission à supprimer.
   * @returns Un Observable qui émet void.
   */
  deleteMission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  /**
   * Récupère les missions d'un employé par son ID.
   * @param employeId L'ID de l'employé.
   * @returns Un Observable qui émet une liste de Missions.
   */
  getMissionsByEmploye(employeId: number): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}/employe/${employeId}`);
  }
}