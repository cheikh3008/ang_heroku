import { Router } from '@angular/router';
import { LoginService } from './../../../services/login/login.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private ls: LoginService, private route: Router, private toastr: ToastrService) { }
  idGerant: number;
  ngOnInit(): void {
    if (localStorage.idGerant === 'undefined') {
      this.route.navigate(['/']);
    }
    this.idGerant = JSON.parse(localStorage.getItem('idGerant'));
  }
  toggleSideBar(){
    this.toggleSideBarForMe.emit();
  }
  onLogout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.ls.logout();
    this.toastr.success('Deconnexion réussi avec success', '');
    return this.route.navigate(['/']);
  }
  onHome() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.ls.logout();
    return this.route.navigate(['/']);
  }
  onUpdate() {
    return this.route.navigate(['dashboard/update-password']);
  }
  getId(id: number){
    this.route.navigate(['dashboard/edit/gerant/', id]);
  }
}
