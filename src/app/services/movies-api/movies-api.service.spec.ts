import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MoviesApiService } from './movies-api.service';
import { FetchAllResponse } from './movies-api.model';

describe(MoviesApiService.name, () => {
  let service: MoviesApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MoviesApiService);
  });

  describe('fetchAll', () => {
    it("calls 'GET assets/movie.mock-data.json'", () => {
      const mockResponse: FetchAllResponse = [];
      service.fetchAll().subscribe((response) => {
        expect(response).toStrictEqual(mockResponse);
      });

      const request = httpController.expectOne({
        method: 'GET',
        url: 'assets/movie.mock-data.json',
      });
      request.flush(mockResponse);
    });
  });
});
