import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatService {

  constructor(private http: HttpClient) { }

  getAllPlat()  {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any[]>(`${environment.apiUrl}/api/plat/list`
    );
  }
  getAllPlatByRestoId(id: number): Observable<any[]>  {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any[]>(`${environment.apiUrl}/api/plat/list/${id}`
    );
  }
  // tslint:disable-next-line: typedef
  postPlat(data: any){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<any[]>(`${environment.apiUrl}/api/plat/add`, data, {headers}
    );
  }
  putPlat(id: number, data): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/plats/${id}`, data);
  }
  // tslint:disable-next-line: typedef
  deletePlat(id: number){
    return this.http.delete<any[]>(`${environment.apiUrl}/api/plats/` + id);
  }
  getId(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(`${environment.apiUrl}/api/plats/` + id, { headers});
  }
}
