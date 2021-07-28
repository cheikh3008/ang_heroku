
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const optionRequete = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RestoService {
  constructor(private http: HttpClient) { }
  getListResto(): Observable<any[]>  {
    return this.http.get<any[]>(`${environment.apiUrl}/api/resto/list`);
  }
  postResto(data): Observable<any[]>  {
    return this.http.post<any[]>(`${environment.apiUrl}/api/resto/add`, data,  );
  }
  detailsResto(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/resto/list/` + id);
  }
  getId(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(`${environment.apiUrl}/api/restos/` + id, { headers});
  }
  updateResto(data: any){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put<any[]>(`${environment.apiUrl}/api/resto/edit`, data, {headers}
    );
  }
  updateImageResto(data: any){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<any[]>(`${environment.apiUrl}/api/resto/image-edit`, data, {headers}
    );
  }
  getRestoByUserConnected(){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any[]>(`${environment.apiUrl}/api/resto/user`, {headers}
    );
  }
}
