import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ApiResponse, PokemonDTO } from 'src/app/models/models';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {

  private BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient, private snap: MatSnackBar) {}

  getPokemons(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.BASE_URL}/?offset=0&limit=40`);
  }

  getPokemon(id): Observable<PokemonDTO> {
    return this.http.get<PokemonDTO>(`${this.BASE_URL}/${id}`);
  }
}
