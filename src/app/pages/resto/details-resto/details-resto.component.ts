import { LoginService } from './../../../services/login/login.service';
import { DialogComponent } from './../../dialog/dialog.component';
import { MenuService } from 'src/app/services/menu/menu.service';
import { PanierService } from './../../../services/panier.service';
import { RestoService } from './../../../services/resto/resto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plat } from 'src/app/model/plat';
import { BehaviorSubject } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-details-resto',
  templateUrl: './details-resto.component.html',
  styleUrls: ['./details-resto.component.scss']
})
export class DetailsRestoComponent implements OnInit {
  id: number;
  resto: any;
  menus: any;
  itemInCart: number;
  currentUserSubject: BehaviorSubject<any>;
  urlimg = 'data:image/png;base64,';
  roles: any;
  nomComplet: string;
  constructor( private rs: RestoService,
               private route: ActivatedRoute,
               private router: Router,
               private ms: MenuService,
               private pas: PanierService,
               public dialog: MatDialog,
               private ls: LoginService
              ) {
                this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
              }

  ngOnInit(): void {
    // this.roles = JSON.parse(localStorage.getItem('roles'));
    // this.nomComplet = JSON.parse(localStorage.getItem('nomComplet'));
    this.id = this.route.snapshot.params.id;
    localStorage.setItem('restoId', JSON.stringify(this.id));
    this.rs.detailsResto(this.id).subscribe( data => {
      this.resto = data;
    });
    this.ms.getAllMenuByrestoId(this.id).subscribe( data => {
      this.menus = data;

    });
    this.pas.cartItem.subscribe( data => {
      this.itemInCart = data.length;
    });

  }

  addPanier(plat: Plat) {
    this.pas.addCart(plat);
  }

  openDialog() {
    if (this.currentUserSubject.value === null) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '450px',
        height : '400px',
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }
  isRoleClient() {
    this.roles = JSON.parse(localStorage.getItem('roles'));
    if (this.roles) {
      if (this.roles['0'] === 'ROLE_CLIENT' || this.roles['0'] === 'ROLE_GERANT') {
        return true;
      }
    }
  }
  onLogout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.ls.logout();
    location.reload();
    return this.router.navigate(['list/resto/', this.resto]);
  }
  getProfil() {
    return this.router.navigate(['profil/client']);
  }
}
