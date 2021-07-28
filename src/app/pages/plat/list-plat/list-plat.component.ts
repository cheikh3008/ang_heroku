import { ActivatedRoute, Router } from '@angular/router';
import { PlatService } from './../../../services/plat/plat.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Plat } from 'src/app/model/plat';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-plat',
  templateUrl: './list-plat.component.html',
  styleUrls: ['./list-plat.component.scss']
})
export class ListPlatComponent implements OnInit {

  constructor(private ps: PlatService,
              private router: Router ,
              private toastr: ToastrService
            ) { }

  plats = [];
  dataPlats: any;
  roles: string;
  plat: Plat[];
  searchValue: string;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'nomPlat', 'description', 'prix', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.ps.getAllPlat()
      .subscribe( data => {
        this.plats.push(this.plats);
        this.dataPlats = data;
        this.listData = new MatTableDataSource(this.dataPlats);
        this.listData.paginator = this.paginator;
        console.log(data);
      }, error => {
      console.log(error);
    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }
  deleteMenu(id: number) {
    if ( confirm('Etes vous  sur de vouloir supprimer cet plat')) {
      this.ps.deletePlat(id).subscribe(data => {
        const currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        this.toastr.success('Votre plat a été bien supprimé', '');
      }, error => {
        console.log(error);

      });
    }
  }
  getId(id: number) {
    this.router.navigate(['/dashboard/menu/edit', id]);
  }
}
