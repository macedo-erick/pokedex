import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TypesService {
  BASE_URL = 'https://pokeapi.co/api/v2/type';

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

  getType(name?: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${name}`).pipe(
      map((obj) => obj),
      catchError((e) => {
        return this.errorHandler(e);
      })
    );
  }
}
