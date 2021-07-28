import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DefaultModule } from './layouts/default/default.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './pages/login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptorService } from './services/helpers/error-interceptor.service';
import { JwtInterceptorService } from './services/helpers/jwt-interceptor.service';
import { DefaultComponent } from './layouts/default/default.component';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DetailsRestoComponent } from './pages/resto/details-resto/details-resto.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import { EditPlatComponent } from './pages/plat/edit-plat/edit-plat.component';
import { ListPanierComponent } from './pages/panier/list-panier/list-panier.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { AddReservationClientComponent } from './pages/reservation/add-reservation-client/add-reservation-client.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './pages/dialog/dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProfilClientComponent } from './pages/profil/profil-client/profil-client.component';
import {MatMenuModule} from '@angular/material/menu';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { EditClientComponent } from './pages/profil/edit-client/edit-client.component';
import { PasswordComponent } from './pages/resto/password/password.component';
import { EditGerantComponent } from './pages/resto/edit-gerant/edit-gerant.component';
import { ToastrModule } from 'ngx-toastr';
import { EditImageRestoComponent } from './pages/resto/edit-image-resto/edit-image-resto.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import {MatButtonModule} from '@angular/material/button';
import { AddCommandeComponent } from './pages/commande/add-commande/add-commande.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    DetailsRestoComponent,
    EditPlatComponent,
    ListPanierComponent,
    AddReservationClientComponent,
    DialogComponent,
    ProfilClientComponent,
    UpdatePasswordComponent,
    EditClientComponent,
    PasswordComponent,
    EditGerantComponent,
    EditImageRestoComponent,
    NavBarComponent,
    AddCommandeComponent
  ],
  entryComponents: [
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DefaultModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MaterialFileInputModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatTabsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatRippleModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatMenuModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
    MatButtonModule
  ],
  providers: [
  DefaultComponent, {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorService,
    multi: true
  },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
