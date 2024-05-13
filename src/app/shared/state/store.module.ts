import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { MoviesState } from './movies/movies.state';
import { environment } from '@env/environment';

export const NGXS_STATES = [MoviesState];

@NgModule({
  imports: [
    NgxsModule.forRoot(NGXS_STATES, {
      developmentMode: !environment.production,
    }),
  ],
  exports: [NgxsModule],
})
export class StoreModule {}
