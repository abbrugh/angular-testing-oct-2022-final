import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { MastheadComponent } from './components/masthead/masthead.component';
import { HomeComponent } from './components/home/home.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'counter',
    loadChildren: () => import('@ht/counter').then((c) => c.CounterModule),
  },
  {
    path: 'songs',
    loadChildren: () => import('@ht/songs').then((m) => m.SongsModule),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    MastheadComponent,
    HomeComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
