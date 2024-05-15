import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { MoviesState } from './movies/movies.state';
import { environment } from '@env/environment';

export const NGXS_STATES = [MoviesState];

@NgModule({
  imports: [
    HttpClientModule,
    NgxsModule.forRoot(NGXS_STATES, {
      developmentMode: !environment.production,
    }),
    NgxsStoragePluginModule.forRoot({
      key: [],
    }),
    NgxsRouterPluginModule.forRoot(),
  ],
  exports: [NgxsModule],
})
export class StoreModule {}
