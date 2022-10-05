import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlaylistFeatureEvents } from './state/actions/feature.actions';

@Component({
  selector: 'ht-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
})
export class SongsComponent {
  constructor(store: Store) {
    store.dispatch(PlaylistFeatureEvents.entered());
  }
}
