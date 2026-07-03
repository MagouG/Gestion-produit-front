import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ProduitService } from '../../services/produit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-produit-form',
  templateUrl: './produit-form.component.html'
})
export class ProduitFormComponent implements OnInit {

  produitForm!: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.produitForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      prix: ['', Validators.required],
      quantite: ['', Validators.required]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if(this.id){

      this.produitService.getProduit(this.id)
      .subscribe(data => {

        this.produitForm.patchValue(data);

      });

    }
  }

  save() {

    if(this.produitForm.invalid)
      return;

    if(this.id){

      this.produitService.updateProduit(
        this.id,
        this.produitForm.value
      ).subscribe(() => {

        this.router.navigate(['/']);

      });

    } else {

      this.produitService.createProduit(
        this.produitForm.value
      ).subscribe(() => {

        this.router.navigate(['/']);

      });

    }

  }

}
