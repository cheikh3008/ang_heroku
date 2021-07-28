import { Router } from '@angular/router';
import { MenuService } from './../../../services/menu/menu.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss']
})
export class ListMenuComponent implements OnInit {

  constructor(private ms: MenuService,
              private router: Router ,
              private toastr: ToastrService) { }

  menus = [];
  dataMenus: any;
  roles: string;
  listData: MatTableDataSource<any>;
  urlimg = 'data:image/png;base64,';
  displayedColumns: string[] = ['id', 'categorie', 'image' , 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.ms.getAllMenu()
      .subscribe( data => {
      this.menus.push(this.dataMenus);
      this.dataMenus = data;
      console.log(this.dataMenus);

      this.listData = new MatTableDataSource(this.dataMenus);
      this.listData.paginator = this.paginator;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }
  deleteMenu(id: number) {
    if ( confirm('Etes vous  sur de vouloir supprimer cet menu')) {
      this.ms.deleteMenu(id).subscribe(data => {
        const currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        this.toastr.success('Votre menu a été bien supprimé', '');
      });
    }
  }
  getId(id: number){
    this.router.navigate(['dashboard/menu/edit/', id]);
  }
}
