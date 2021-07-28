import { RestoService } from './../../../services/resto/resto.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-gerant',
  templateUrl: './edit-gerant.component.html',
  styleUrls: ['./edit-gerant.component.scss']
})
export class EditGerantComponent implements OnInit {
  gerantForm: FormGroup;
  resto: any;
  submitted = false;
  selected: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private res: RestoService,
    private _location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.res.getId(params.id).subscribe(data => {
        this.gerantForm.patchValue(data);
        this.gerantForm.patchValue(this.gerantForm.value.user);
        console.log(this.gerantForm.value.user);
      });
    });
    this.gerantForm = this.formBuilder.group({
      user: [''],
      nomComplet: ['',  Validators.required],
      telephone: ['', [Validators.required , Validators.pattern('^[77,78,76,70,75]{2}[0-9]{7}$')]],
      nomResto: ['', Validators.required],
      description: ['', Validators.required],
      adresse: ['', Validators.required],
    });
  }
  get f() { return this.gerantForm.controls; }
  // tslint:disable-next-line: typedef
  onSubmitForm(){
    this.submitted = true;
    if (this.gerantForm.invalid) {
      return;
    }
    const resto = {
      nomComplet: this.gerantForm.value.nomComplet,
      telephone: this.gerantForm.value.telephone,
      nomResto: this.gerantForm.value.nomResto,
      adresse: this.gerantForm.value.adresse,
      description: this.gerantForm.value.description,
    };
    console.log(resto);
    this.res.updateResto(resto).subscribe( data => {
      this.toastr.success('Votre resto a été modifié avec succes.', '');
      // alert('Votre resto a été modifié avec succes.');
      return this.router.navigate(['dashboard']);
      console.log(data);
    }, error => {
      // alert(error);
      this.toastr.error('Oups, une erreur s\'est produite', '', {
        timeOut: 3000,
      });
    });
  }
  backClicked() {
    this._location.back();
  }
}
