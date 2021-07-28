import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(protected http: HttpClient) { }
  updatePassword(data: any): Observable<any[]>  {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<any[]>(`${environment.apiUrl}/api/password/update`, data , {headers}
    );
  }
}
