import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Plat } from 'src/app/model/plat';
import { LoginService } from 'src/app/services/login/login.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { PanierService } from 'src/app/services/panier.service';
import { RestoService } from 'src/app/services/resto/resto.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  id: number;
  resto: any;
  menus: any;
  itemInCart: number;
  currentUserSubject: BehaviorSubject<any>;
  urlimg = 'data:image/png;base64,';
  roles: any;
  nomComplet: string;
  idR: void;
  restoId: any;
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
    this.nomComplet = JSON.parse(localStorage.getItem('nomComplet'));
    this.id = this.route.snapshot.params.id;
    this.restoId = JSON.parse(localStorage.getItem('restoId'));
    this.rs.detailsResto(this.restoId).subscribe( data => {
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
      if (this.roles['0'] === 'ROLE_CLIENT') {
        return true;
      }
      if (this.roles['0'] === 'ROLE_GERANT') {
        return false;
      }
    }
  }
  onLogout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.ls.logout();
    return this.router.navigate(['/']);
  }
  getProfil() {
    return this.router.navigate(['profil/client']);
  }
  getRelead(){
    return this.router.navigate(['/list/resto/', this.restoId ]);
  }
}
