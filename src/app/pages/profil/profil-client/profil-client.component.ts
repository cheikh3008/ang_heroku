import { ReservationService } from './../../../services/reservation/reservation.service';
import { CommandeService } from './../../../services/commande/commande.service';
import { EditClientComponent } from './../edit-client/edit-client.component';
import { UpdatePasswordComponent } from './../../update-password/update-password.component';
import { ClientService } from './../../../services/client/client.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {Location} from '@angular/common';

@Component({
  selector: 'app-profil-client',
  templateUrl: './profil-client.component.html',
  styleUrls: ['./profil-client.component.scss']
})
export class ProfilClientComponent implements OnInit {
  profil: any;
  commandes: any;
  reservations: any;
  constructor(  private cs: ClientService,
                private router: Router,
                public dialog: MatDialog,
                private _location: Location,
                private cmds: CommandeService,
                private res: ReservationService
              )
              { }

  ngOnInit(): void {

    this.cs.getProfilClient().subscribe( data => {
      this.profil = data;
    }, error => {
      alert(error);
    });
    this.cmds.getCommandeByClient().subscribe( data => {
      this.commandes = data;
    }, error => {
      console.log(error);
    });
    this.res.getReservationByClient().subscribe( data => {
      this.reservations = data;
      console.log(data);
    });
  }
  getPassword() {
    this.router.navigate(['update-password/client']);
  }
  getId(id: number) {
    this.router.navigate(['/edit/client/', id]);
  }
  backClicked() {
    this._location.back();
  }
}
