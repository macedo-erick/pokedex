import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  BASE_URL = 'https://pokeapi.co/api/v2/pokemon-species';

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

  getSpecie(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/${id}`).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
}
