import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TypesService {
  private BASE_URL = 'https://pokeapi.co/api/v2/type';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getType(name?: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${name}`).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 30000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage(
      e.error.message ? e.error.message : 'Unhandled error ',
      true
    );
    return EMPTY;
  }
}
