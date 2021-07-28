import { ClientService } from './../../services/client/client.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { MustMatch } from 'src/app/services/helpers/must-match.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  formConnexion: FormGroup;
  inscriptionForm: FormGroup;
  errorMessageLogin: string;
  errorMessageRegister: string;
  submitted: boolean;
  roles: any;
  currentRoute: string;
  restoId: any;
  constructor(private ls: LoginService,
              private router: Router,
              private formBuilder: FormBuilder ,
              private cs: ClientService,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogComponent
              ) { }

  ngOnInit(): void {
    this.formConnexion =  this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
    this.inscriptionForm =  this.formBuilder.group({
      nomComplet: ['', [Validators.required]],
      telephone: ['',  [Validators.required,  Validators.pattern('^[77,78,76,70,75]{2}[0-9]{7}$')]],
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      adresseDomicile: ['', [Validators.required]],
    },
      {  validator: MustMatch('password', 'confirmPassword') }
    );
    this.restoId = JSON.parse(localStorage.getItem('restoId'));
    this.currentRoute = this.router.url;
    console.log(this.currentRoute);

  }
  get f() { return this.formConnexion.controls; }
  get g() { return this.inscriptionForm.controls; }
  // tslint:disable-next-line: typedef
  onSubmitLogin() {

    this.submitted = true;
    if (this.formConnexion.invalid) {
      return;
    }
    const  user = {
        username: this.formConnexion.value.username,
        password: this.formConnexion.value.password,
    };
    this.ls.login(user).subscribe(
      data => {
        this.roles = JSON.parse(localStorage.getItem('roles'));
        this.dialogRef.close();
        this.toastr.success('Authentification réussi avec succes.', '');
        if (this.currentRoute === '/list/resto/' + this.restoId && this.roles['0'] === 'ROLE_CLIENT') {
          console.log(this.currentRoute);
          return this.router.navigate(['reservation/', this.restoId]);
        }
        if (this.currentRoute === '/panier' && this.roles['0'] === 'ROLE_CLIENT') {
          return this.router.navigate(['commande']);
        }
        if (this.roles['0'] === 'ROLE_GERANT') {
          return this.router.navigate(['dashboard']);
        }
      },
      error => {
      this.errorMessageLogin = 'username ou mot de passe incorrect';
      this.toastr.error('Oups, une erreur s\'est produite.', '', {
        timeOut: 3000,
      });
    });

  }
  onSubmitRegister(){
    this.submitted = true;
    if (this.inscriptionForm.invalid) {
      return;
    }
    const  users = {
        nomComplet: this.inscriptionForm.value.nomComplet,
        telephone: this.inscriptionForm.value.telephone,
        username: this.inscriptionForm.value.username,
        password: this.inscriptionForm.value.password,
        adresseDomicile: this.inscriptionForm.value.adresseDomicile,
    };
    const  user = {
      username: users.username,
      password: users.password,
    };

    this.cs.postClient(users).subscribe( data => {
      // alert(JSON.stringify('Votre compte a été crée avec succes.'));
      this.toastr.success('Votre compte a été crée avec succes.', '');
      this.ls.login(user).subscribe(
        data => {
          this.roles = JSON.parse(localStorage.getItem('roles'));
          this.dialogRef.close();
          if (this.currentRoute === '/list/resto/' + this.restoId && this.roles['0'] === 'ROLE_CLIENT') {
            return this.router.navigate(['reservation/', this.restoId]);
          }
          if (this.currentRoute === '/panier' && this.roles['0'] === 'ROLE_CLIENT') {
            return this.router.navigate(['commande']);
          }
          if (this.roles['0'] === 'ROLE_GERANT') {
            return this.router.navigate(['dashboard']);
          }
        },
        error => {
        this.errorMessageLogin = 'username ou mot de passe incorrect';
        this.toastr.error('Oups, une erreur s\'est produite.', '', {
          timeOut: 3000,
        });
      });
    }, errors => {
      // console.log(errors);
      // alert(JSON.stringify(errors));
      this.errorMessageRegister = JSON.stringify(errors);
      this.toastr.error('Oups, une erreur s\'est produite.', '', {
        timeOut: 3000,
      });
    });
  }
}
