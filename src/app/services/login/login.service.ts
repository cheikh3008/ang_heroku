import { environment } from './../../../environments/environment';
import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  helper = new JwtHelperService();
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(login: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/login_check`, login)
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        const decodedToken = this.helper.decodeToken(user.token);
        localStorage.setItem('roles', JSON.stringify(decodedToken.roles));
        localStorage.setItem('username', JSON.stringify(decodedToken.username));
        localStorage.setItem('nomResto', JSON.stringify(decodedToken.nomResto));
        localStorage.setItem('image', JSON.stringify(decodedToken.image));
        localStorage.setItem('telephone', JSON.stringify(decodedToken.telephone));
        localStorage.setItem('adresse', JSON.stringify(decodedToken.adresse));
        localStorage.setItem('nomComplet', JSON.stringify(decodedToken.nomComplet));
        localStorage.setItem('idGerant', JSON.stringify(decodedToken.idGerant));
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      })
    );
  }
  getToken() {
    return localStorage.getItem('roles');
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
