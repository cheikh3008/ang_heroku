import { Router } from '@angular/router';
import { CommandeService } from './../../../services/commande/commande.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-commande',
  templateUrl: './add-commande.component.html',
  styleUrls: ['./add-commande.component.scss']
})
export class AddCommandeComponent implements OnInit {
  plats: any;
  roles: any;
  restoId: any;
  nomComplet: any;
  telephone: any;
  adresse: any;
  form: FormGroup;
  submitted = false;
  tab = [];
  total = 0;
  constructor(private formBuilder: FormBuilder,
              private cs: CommandeService,
              private toastr: ToastrService,
              private router: Router
            ) { }

  ngOnInit(): void {
    this.plats = JSON.parse(localStorage.getItem('cart'));
    this.roles = JSON.parse(localStorage.getItem('roles'));
    this.nomComplet = JSON.parse(localStorage.getItem('nomComplet'));
    this.telephone = JSON.parse(localStorage.getItem('telephone'));
    this.adresse = JSON.parse(localStorage.getItem('adresse'));
    this.restoId = JSON.parse(localStorage.getItem('restoId'));
    this.form = this.formBuilder.group({
      numero: ['', Validators.required],
      plat: [this.formBuilder.array([]), Validators.required]
    });
    this.plats.forEach((element) => {
      this.total += (element.quantite * element.prix);
    });
  }
  onUpload(){
    this.submitted = true;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.plats.length; i++) {
      const element = this.plats[i];
      let j = 1;
      while (j <= this.plats[i].quantite) {
        this.tab.push(this.plats[i].id  );
        j++;
        // console.log(this.tab);
      }

    }
    const commande = {
      plat: this.tab
    };
    this.cs.postCommande(commande).subscribe( data => {
      localStorage.removeItem('cart');
      this.toastr.success('Votre commande a été enrégistré avec succes', '');
      return this.router.navigate(['list/resto/', this.restoId]);
    }, error => {
      // alert(error);
      this.toastr.error('Oups, une erreur s\'est produite', '', {
        timeOut: 3000,
      });
    });
  }

}
