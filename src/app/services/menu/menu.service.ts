import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private http: HttpClient) { }
  getAllMenu(): Observable<any[]>  {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any[]>(`${environment.apiUrl}/api/menu/list`, {headers}
    );
  }

  getAllMenuByrestoId(id: number): Observable<any[]>  {
    return this.http.get<any[]>(`${environment.apiUrl}/api/menu/list/` + id
    );
  }
  postMenu(data): Observable<any[]>  {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<any[]>(`${environment.apiUrl}/api/menu/add`, data, {headers}
    );
  }
  getId(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(`${environment.apiUrl}/api/menus/` + id, { headers});
  }
  deleteMenu(id: number){
    return this.http.delete<any[]>(`${environment.apiUrl}/api/menus/` + id);
  }
  updateMenu(id: number, data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(`${environment.apiUrl}/api/menus/` + id, data , { headers});
  }
}
