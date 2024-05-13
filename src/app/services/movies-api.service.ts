import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FetchAllResponse } from './movies-api.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private readonly dataURL = 'assets/movie.mock-data.json';

  constructor(private readonly http: HttpClient) {}

  fetchAll() {
    return this.http.get<FetchAllResponse>(this.dataURL);
  }
}
