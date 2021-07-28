import { CommandeService } from './../../../services/commande/commande.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.scss']
})
export class ListCommandeComponent implements OnInit {
  commande: any;
  plat: any;
  searchText;
  message: string;
  constructor( private cs: CommandeService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.cs.getCommandeByResto().subscribe( data => {
      console.log(data);
      this.commande = data;
    });
  }
  onStatus(id: number) {
    this.cs.getEtatCommande(id).subscribe(data => {
      this.message = JSON.stringify(data['message']);
      this.toastr.success(this.message.toString().replace('"', ''), '');
      const currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    } , error => {
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
