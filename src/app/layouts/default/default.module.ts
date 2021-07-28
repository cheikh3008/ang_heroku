import { EditMenuComponent } from './../../pages/menu/edit-menu/edit-menu.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddPlatComponent } from './../../pages/plat/add-plat/add-plat.component';
import { AddMenuComponent } from './../../pages/menu/add-menu/add-menu.component';
import { ListMenuComponent } from './../../pages/menu/list-menu/list-menu.component';
import { ListPlatComponent } from './../../pages/plat/list-plat/list-plat.component';
import { ListReservationComponent } from './../../pages/reservation/list-reservation/list-reservation.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SharedModule } from './../../shared/shared/shared.module';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from './../../module/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCommandeComponent } from 'src/app/pages/commande/list-commande/list-commande.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddTablesComponent } from 'src/app/pages/tables/add-tables/add-tables.component';
import { ListTablesComponent } from 'src/app/pages/tables/list-tables/list-tables.component';
import { AddRestoComponent } from 'src/app/pages/resto/add-resto/add-resto.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    ListCommandeComponent,
    ListMenuComponent,
    ListPlatComponent,
    ListReservationComponent,
    AddMenuComponent,
    AddPlatComponent,
    AddTablesComponent,
    ListTablesComponent,
    AddRestoComponent,
    EditMenuComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MaterialFileInputModule,
    MatToolbarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatExpansionModule,
    Ng2SearchPipeModule,
    MatFormFieldModule,
  ]
})
export class DefaultModule { }
