import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private http: HttpClient) {}

  get(url: string): Promise<any> {
    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
}
