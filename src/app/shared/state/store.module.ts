import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { MoviesState } from './movies/movies.state';
import { UserState } from './user/user.state';
import { environment } from '@env/environment';

export const NGXS_STATES = [MoviesState, UserState];

const developmentMode = !environment.production;

@NgModule({
  imports: [
    NgxsModule.forRoot(NGXS_STATES, { developmentMode }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({ key: [UserState] }),
  ],
  exports: [NgxsModule],
})
export class StoreModule {}
