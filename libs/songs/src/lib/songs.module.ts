import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsComponent } from './songs.component';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { EntryComponent } from './components/entry/entry.component';
import { StoreModule } from '@ngrx/store';
import { featureName, reducers } from './state';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { SongEffects } from './state/effects/songs.effects';
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: SongsComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'new',
        component: EntryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([SongEffects]),
  ],
  declarations: [
    SongsComponent,
    ListComponent,
    EntryComponent,
  ],
})
export class SongsModule {}
