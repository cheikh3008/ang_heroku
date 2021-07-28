import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss']
})
export class ListReservationComponent implements OnInit {

  constructor(private res: ReservationService, private toastr: ToastrService, private router: Router) { }
  message: string;
  reservations: any[];
  searchText;
  ngOnInit(): void {
    this.res.getReservationByGerant()
      .subscribe( data => {
        this.reservations = data;
        console.log(this.reservations);
    });

  }
  onStatus(id: number) {
    this.res.getEtatReservation(id).subscribe(data => {
      this.message = JSON.stringify(data['message']);
      this.toastr.success(this.message.toString().replace('"', ''), '');
      const currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    }, error => {
      this.toastr.error(error, '', {
        timeOut: 3000,
      });
      const currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    });
  }
}
