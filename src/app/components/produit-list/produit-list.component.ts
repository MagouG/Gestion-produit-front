import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/produits';

@Component({
  selector: 'app-produit-list',
  templateUrl: "produit-list.component.html",
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ProduitListComponent implements OnInit {

  produits: Produit[] = [];

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits() {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
    });
  }

  supprimer(id: number) {
    if(confirm("Supprimer ce produit ?")) {
      this.produitService.deleteProduit(id).subscribe(() => {
        this.loadProduits();
      });
    }
  }
}
