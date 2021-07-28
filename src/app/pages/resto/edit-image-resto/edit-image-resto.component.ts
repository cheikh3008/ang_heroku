import { RestoService } from 'src/app/services/resto/resto.service';
import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-image-resto',
  templateUrl: './edit-image-resto.component.html',
  styleUrls: ['./edit-image-resto.component.scss']
})
export class EditImageRestoComponent implements OnInit {
  formImage: FormGroup;
  submitted = false;
  selectedFile: any;
  uploadData: FormData;
  resto: any;
  urlimg = 'data:image/png;base64,';
  constructor(
    private router: Router,
    private res: RestoService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditImageRestoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditImageRestoComponent
  ) { }

  ngOnInit(): void {
    this.formImage = this.formBuilder.group({
      image: ['', [Validators.required]],
    });
    // this.images = JSON.parse(localStorage.getItem('image'));
    this.res.getRestoByUserConnected().subscribe( data => {
      console.log(data);
      this.resto = data;
    });
  }
  onFileSelected($event){
    if ($event.target.files.length > 0) {
      this.selectedFile = $event.target.files[0];
      this.formImage.get('image').setValue(this.selectedFile);
    }
  }
  get f() { return this.formImage.controls; }
  onSubmitForm(){
    this.submitted = true;
    if (this.formImage.invalid) {
      return;
    }
    this.uploadData = new FormData();
    this.uploadData.append('image', this.selectedFile, this.selectedFile.name);
    console.log(this.selectedFile, this.uploadData);

    this.res.updateImageResto(this.uploadData).subscribe( data => {
      this.toastr.success('Votre image de profile a été mise à jour', '');
      const currentUrl = this.router.url;
      this.dialogRef.close();
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);

    }, error => {
      this.toastr.error('Oups, une erreur s\'est produite', '', {
        timeOut: 3000,
      });
    });
  }
}
