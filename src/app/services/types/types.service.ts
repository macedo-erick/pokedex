import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TypesService {
  private BASE_URL = 'https://pokeapi.co/api/v2/type';

  constructor(private http: HttpClient, private snap: MatSnackBar) {}

  getType(name?: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${name}`);
  }
}
