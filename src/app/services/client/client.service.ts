import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor( private http: HttpClient) { }
  postClient(data): Observable<any[]>  {
    return this.http.post<any[]>(`${environment.apiUrl}/api/clients`, data,  );
  }
  getProfilClient(): Observable<any[]>  {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any[]>(`${environment.apiUrl}/api/client/profil`, {headers}
    );
  }
  updateClient(data: any, id: number): Observable<any[]>  {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put<any[]>(`${environment.apiUrl}/api/users/` + id, data , {headers}
    );
  }
  getId(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(`${environment.apiUrl}/api/users/` + id, { headers});
  }
}
