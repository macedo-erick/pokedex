import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { apiPokemonsResponse, Pokemon } from 'src/app/models/models';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage(
      e.message ? e.message : 'Unhandled error ',
      true
    );
    return EMPTY;
  }

  getPokemons(offset: any = 0, limit: any = 40): Observable<apiPokemonsResponse> {
    return this.http
      .get<apiPokemonsResponse>(`${this.BASE_URL}/?offset=${offset}&limit=${limit}`)
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }

  getPokemon(id: any): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.BASE_URL}/${id}`).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
}
