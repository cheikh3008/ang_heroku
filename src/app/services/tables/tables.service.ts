import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(private http: HttpClient) { }

  getAllTables(): Observable<any[]>  {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any[]>(`${environment.apiUrl}/api/list/tables`, {headers}
    );
  }
  getAllTablesByRestoId(id: number): Observable<any[]>  {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any[]>(`${environment.apiUrl}/api/list/tables/` + id, {headers}
    );
  }
  addAllTables(data: any): Observable<any[]>  {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<any[]>(`${environment.apiUrl}/api/add/tables`, data , {headers}
    );
  }
  deleteTable(id: number){
    return this.http.delete<any[]>(`${environment.apiUrl}/api/tables/` + id);
  }
  getId(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(`${environment.apiUrl}/api/tables/` + id, { headers});
  }
}
