import { TablesService } from './../../../services/tables/tables.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-tables',
  templateUrl: './add-tables.component.html',
  styleUrls: ['./add-tables.component.scss']
})
export class AddTablesComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ts: TablesService,
    private toastr: ToastrService

  ) { }

  get f() { return this.formTables.controls; }
  formTables: FormGroup;
  submitted = false;
  ngOnInit(): void {
    this.formTables = this.formBuilder.group({
      numero: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      nbPersonne: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    });

  }
  onSubmitForm(){
    this.submitted = true;
    if (this.formTables.invalid) {
      return;
    }
    const tables = {
      numero: this.formTables.value.numero,
      nbPersonne: this.formTables.value.nbPersonne,
    };
    this.ts.addAllTables(tables).subscribe( data => {
      // alert('Votre tables a été bien ajouté ');
      this.toastr.success('Votre table a été bien ajouté ', '');
      return this.router.navigate(['dashboard/tables/list']);
    }, errors => {
      this.toastr.error('Oups, une erreur s\'est produite', '', {
        timeOut: 3000,
      });
      console.log(errors);

    });
  }

}
