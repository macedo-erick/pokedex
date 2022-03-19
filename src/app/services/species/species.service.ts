import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  BASE_URL = 'https://pokeapi.co/api/v2/pokemon-species';

  constructor(private http: HttpClient) {}

  getSpecie(id: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/${id}`);
  }
}
