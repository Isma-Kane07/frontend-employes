import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from '../models/employe.model'; 
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private apiUrl = 'http://localhost:8080/employes';

  constructor(private http: HttpClient) { }

  getAllEmployes(): Observable<Employe[]> {
    return this.http.get<Employe[]>(this.apiUrl);
  }

getEmployesPaginated(page: number, size: number): Observable<Page<Employe>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Employe>>(`${this.apiUrl}/paginated`, { params });
  }
  
  getEmployeById(id: number): Observable<Employe> {
    return this.http.get<Employe>(`${this.apiUrl}/${id}`);
  }

  createEmploye(employe: Employe): Observable<Employe> {
    return this.http.post<Employe>(`${this.apiUrl}/create`, employe);
  }

  updateEmploye(id: number, employe: Employe): Observable<Employe> {
    return this.http.put<Employe>(`${this.apiUrl}/update/${id}`, employe);
  }

  deleteEmploye(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}