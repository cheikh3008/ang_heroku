import { ActivatedRoute, Router } from '@angular/router';
import { PlatService } from './../../../services/plat/plat.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-plat',
  templateUrl: './add-plat.component.html',
  styleUrls: ['./add-plat.component.scss']
})
export class AddPlatComponent implements OnInit {

  constructor(  private ps: PlatService,
                private ms: MenuService ,
                private router: Router,
                private formBuilder: FormBuilder,
                private toastr: ToastrService
              ) { }
  get f() { return this.formPlat.controls; }
  formPlat: FormGroup;
  menus: any;
  submitted = false;
  selected: string;
  urlimg = 'data:image/png;base64,';
  selectedFile: any;
  uploadData: FormData;
  ngOnInit(): void {
    this.formPlat = this.formBuilder.group({
      nomPlat: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
      prix: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      menu: ['', Validators.required],
    });
    this.ms.getAllMenu().subscribe( data => {
      this.menus = data;
      console.log(this.menus);
    });
  }

  onSubmitForm(){
    this.submitted = true;
    if (this.formPlat.invalid) {
      return;
    }
    const plats = {
      nomPlat: this.formPlat.value.nomPlat,
      description: this.formPlat.value.description,
      prix: this.formPlat.value.prix,
      menu: this.formPlat.value.menu,
    };
    this.ps.postPlat(plats).subscribe( data => {
      this.toastr.success('Votre plat a été bien ajouté', '');
      // alert('Votre plat a été bien ajouté ');
      return this.router.navigate(['dashboard/plat/list']);
    }, error => {
      this.toastr.error('Oups, une erreur s\'est produite', '', {
        timeOut: 3000,
      });
    });
  }

}
