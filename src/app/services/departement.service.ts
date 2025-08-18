import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Departement } from '../models/departement.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private apiUrl = 'http://localhost:8080/departements';

  constructor(private http: HttpClient) { }

  getAllDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(this.apiUrl);
  }

  getDepartementsPaginated(page: number, size: number): Observable<Page<Departement>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Departement>>(`${this.apiUrl}/paginated`, { params });
  }

  getTailleActuelle(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/taille-actuelle/${id}`);
  }

  getDepartementById(id: number): Observable<Departement> {
    return this.http.get<Departement>(`${this.apiUrl}/${id}`);
  }

  createDepartement(departement: Departement): Observable<Departement> {
    return this.http.post<Departement>(`${this.apiUrl}/create`, departement);
  }

  updateDepartement(id: number, departement: Departement): Observable<Departement> {
    return this.http.put<Departement>(`${this.apiUrl}/update/${id}`, departement);
  }

  deleteDepartement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

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
}