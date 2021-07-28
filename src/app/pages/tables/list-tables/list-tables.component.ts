import { TablesService } from './../../../services/tables/tables.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-tables',
  templateUrl: './list-tables.component.html',
  styleUrls: ['./list-tables.component.scss']
})
export class ListTablesComponent implements OnInit {

  constructor(private ts: TablesService,
              private router: Router,
              private toastr: ToastrService
    ) { }
  tables = [];
  dataTables: any;
  roles: string;
  searchValue: string;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'numero', 'nbPersonne', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.ts.getAllTables()
      .subscribe(data => {
        this.tables.push(this.tables);
        this.dataTables = data;
        this.listData = new MatTableDataSource(this.dataTables);
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
  deleteTable(id: number) {
    if ( confirm('Etes vous  sur de vouloir supprimer cette table')) {
      this.ts.deleteTable(id).subscribe(data => {
        const currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        this.toastr.success('Votre table a été bien supprimé', '');
      });
    }
  }
}
