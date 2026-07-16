import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../../services/produit.service';

@Component({
  selector: 'app-produit-form',
  templateUrl: './produit-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
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

  cancel() {
    this.router.navigate(['/']);
  }

}
