import { Router } from '@angular/router';
import { RestoService } from './../../services/resto/resto.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  restos = [];
  dataResto: any;
  urlimg = 'data:image/png;base64,';
  recherche: string;
  roles: any;
  constructor(private rs: RestoService, private ls: LoginService, private route: Router) { }

  ngOnInit(): void {
    this.roles = JSON.parse(localStorage.getItem('roles'));
    this.rs.getListResto().subscribe( data => {
      this.dataResto = data;
    });
  }
  isGerant() {
    if ( this.roles[0] === 'ROLE_GERANT') {
      return true;
    }
  }
  isClient() {
    if ( this.roles[0] === 'ROLE_CLIENT') {
      return true;
    }
  }
  onLogout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.ls.logout();
    return this.route.navigate(['/']);
  }
}
