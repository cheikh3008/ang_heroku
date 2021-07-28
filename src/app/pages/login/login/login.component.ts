import { LoginService } from './../../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formConnexion: FormGroup;
  errorMessage: string;
  submitted: boolean;
  roles: any;
  username: any;
  constructor(  private ls: LoginService,
                private router: Router,
                private formBuilder: FormBuilder,
                private toastr: ToastrService
                ) {
    this.roles = JSON.parse(localStorage.getItem('roles'));
    if (this.ls.currentUserValue) {
      this.username = JSON.parse(localStorage.getItem('username'));
      if (this.roles['0'] === 'ROLE_GERANT'){
        this.toastr.success('Vous êtes déja connectés', this.username);
        // window.alert('Vous ếtes déja connectés');
        this.router.navigate(['/dashboard']);
      }else if (this.roles['0'] === 'ROLE_ADMIN' || this.roles['0'] === 'ROLE_CLIENT') {
        this.toastr.success('Vous êtes déja connectés', this.username);
        // window.alert('Vous ếtes déja connectés');
        this.router.navigate(['/']);
      }
    }
  }

  ngOnInit() {
    this.formConnexion =  this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
    }
  get f() { return this.formConnexion.controls; }
  onSubmit() {

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
        this.toastr.success('Authentification réussi avec success', user.username);
        this.roles = JSON.parse(localStorage.getItem('roles'));
        if (this.roles['0'] === 'ROLE_GERANT'){
          this.router.navigate(['/dashboard']);
        } else if (this.roles['0'] === 'ROLE_ADMIN') {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error => {
      this.errorMessage = 'username ou mot de passe incorrect';
      this.toastr.error('Oups, une erreur s\'est produite', '', {
        timeOut: 3000,
      });
    });
  }
}
