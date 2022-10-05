import { createActionGroup, props } from '@ngrx/store';
import { PlaylistCreateModel } from '../../models';
import { SongListEntity } from '../reducers/list.reducer';

export const SongDocuments = createActionGroup({
  source: 'Song Documents',
  events: {
    song: props<{ payload: SongListEntity }>(),
    songs: props<{ payload: SongListEntity[] }>(),
  },
});

export const SongEvents = createActionGroup({
  source: 'Song Events',
  events: {
    added: props<{ payload: PlaylistCreateModel }>(),
    error: props<{ message: string }>(),
  },
});
