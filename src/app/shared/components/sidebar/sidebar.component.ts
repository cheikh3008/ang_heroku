import { EditImageRestoComponent } from './../../../pages/resto/edit-image-resto/edit-image-resto.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { RestoService } from 'src/app/services/resto/resto.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  roles: any;
  resto: any;
  // image: any;
  // nomResto: any;
  urlimg = 'data:image/png;base64,';
  currentUserSubject: any;
  constructor(
    private rs: RestoService,
    public dialog: MatDialog,
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
   }

  ngOnInit(): void {
    // this.roles = JSON.parse(localStorage.getItem('roles'));
    // this.image = JSON.parse(localStorage.getItem('image'));
    // this.nomResto = JSON.parse(localStorage.getItem('nomResto'));
    this.rs.getRestoByUserConnected().subscribe( data => {
      // console.log(data);
      this.resto = data;
    });
  }
  openDialog() {
    if (this.currentUserSubject.value) {
      const dialogRef = this.dialog.open(EditImageRestoComponent, {
        width: '450px',
        height : '400px',
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }
}
