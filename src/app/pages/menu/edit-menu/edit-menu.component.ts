import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss']
})
export class EditMenuComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private ms: MenuService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService
  ) { }
  get f() { return this.formMenu.controls; }
  formMenu: FormGroup;
  submitted = false;
  selectedFile: any;
  uploadData: FormData;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ms.getId(params.id).subscribe(data => {
        this.formMenu.patchValue(data);
        console.log(data);
      });
    });
    this.formMenu = this.formBuilder.group({
      categorie: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
      // image: [''],
    });
  }
  // onFileSelected($event) {
  //   if ($event.target.files.length > 0) {
  //     this.selectedFile = $event.target.files[0];
  //     this.formMenu.get('image').setValue(this.selectedFile);
  //   }
  // }
  onSubmitForm() {
    this.submitted = true;
    if (this.formMenu.invalid) {
      return;
    }
    // this.uploadData = new FormData();
    // this.uploadData.append('image', this.selectedFile, this.selectedFile.name);
    // this.uploadData.append('categorie', this.formMenu.value.categorie);
    // console.log(this.selectedFile, this.formMenu.value.categorie);
    const menu = {
      categorie: this.formMenu.value.categorie
    };
    console.log(menu);

    this.ms.updateMenu(this.route.snapshot.params.id, menu).subscribe(data => {
      this.toastr.success('Votre menu a été bien modifié', '');
      // alert('Votre menu a été bien ajouté avec success');
      return this.router.navigate(['dashboard/menu/list']);
    }, error => {
      this.toastr.error('Oups, une erreur s\'est produite', '', {
        timeOut: 3000,
      });
      console.log(error);

    });
  }

}
