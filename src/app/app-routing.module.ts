import { EditMenuComponent } from './pages/menu/edit-menu/edit-menu.component';
import { EditGerantComponent } from './pages/resto/edit-gerant/edit-gerant.component';
import { PasswordComponent } from './pages/resto/password/password.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { EditClientComponent } from './pages/profil/edit-client/edit-client.component';
import {  ListPanierComponent } from './pages/panier/list-panier/list-panier.component';
import { EditPlatComponent } from './pages/plat/edit-plat/edit-plat.component';
import { DetailsRestoComponent } from './pages/resto/details-resto/details-resto.component';
import { AddRestoComponent } from './pages/resto/add-resto/add-resto.component';
import { LoginComponent } from './pages/login/login/login.component';
import { AddCommandeComponent } from './pages/commande/add-commande/add-commande.component';
import { AddMenuComponent } from './pages/menu/add-menu/add-menu.component';
import { ListReservationComponent } from './pages/reservation/list-reservation/list-reservation.component';
import { ListPlatComponent } from './pages/plat/list-plat/list-plat.component';
import { ListMenuComponent } from './pages/menu/list-menu/list-menu.component';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { DefaultComponent } from './layouts/default/default.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccueilComponent} from './pages/accueil/accueil.component';
import { ListCommandeComponent } from './pages/commande/list-commande/list-commande.component';
import { LoginGuardService } from './services/helpers/login-guard.service';
import { AddReservationClientComponent } from './pages/reservation/add-reservation-client/add-reservation-client.component';
import { AddPlatComponent } from './pages/plat/add-plat/add-plat.component';
import { AddTablesComponent } from './pages/tables/add-tables/add-tables.component';
import { ListTablesComponent } from './pages/tables/list-tables/list-tables.component';
import { ProfilClientComponent } from './pages/profil/profil-client/profil-client.component';

const routes: Routes = [
  { path: '' , component: AccueilComponent },
  { path: 'login', component: LoginComponent },
  {path: 'list/resto/:id', component: DetailsRestoComponent },
  {path: 'panier', component: ListPanierComponent },
  {path: 'reservation/:id', component: AddReservationClientComponent },
  {path: 'commande', component: AddCommandeComponent },
  {path: 'profil/client', component: ProfilClientComponent },
  {path: 'update-password/client', component: UpdatePasswordComponent },
  {path: 'edit/client/:id', component: EditClientComponent },
  { path: '', component: DefaultComponent, children:
    [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'dashboard/commande/list', component: ListCommandeComponent, canActivate: [LoginGuardService]},
      {path: 'dashboard/menu/list', component: ListMenuComponent, canActivate: [LoginGuardService]},
      {path: 'add/resto', component: AddRestoComponent },
      {path: 'dashboard/edit/gerant/:id', component: EditGerantComponent, canActivate: [LoginGuardService] },
      {path: 'dashboard/plat/list', component: ListPlatComponent, canActivate: [LoginGuardService]},
      {path: 'dashboard/reservation/list', component: ListReservationComponent, canActivate: [LoginGuardService]},
      {path: 'dashboard/plat/add', component: AddPlatComponent, canActivate: [LoginGuardService]},
      {path: 'dashboard/menu/add', component: AddMenuComponent, canActivate: [LoginGuardService]},
      {path: 'dashboard/plat/edit/:id', component: EditPlatComponent, canActivate: [LoginGuardService]},
      {path: 'dashboard/menu/edit/:id', component: EditMenuComponent, canActivate: [LoginGuardService]},
      {path: 'dashboard/tables/add', component: AddTablesComponent, canActivate: [LoginGuardService]},
      {path: 'dashboard/tables/list', component: ListTablesComponent, canActivate: [LoginGuardService]},
      {path: 'dashboard/update-password', component: PasswordComponent, canActivate: [LoginGuardService] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
