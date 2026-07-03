import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produits';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private apiUrl = 'https://localhost:5001/api/produits';

  constructor(private http: HttpClient) {}

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  getProduit(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/${id}`);
  }

  createProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  updateProduit(id: number, produit: Produit): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, produit);
  }

  deleteProduit(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
