import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import { SongDocuments } from '../actions/songs.actions';
export interface SongListEntity {
  id: string;
  title: string;
  artist: string;
  album?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SongListState extends EntityState<SongListEntity> {}

export const adapter = createEntityAdapter<SongListEntity>();

const initialState = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(SongDocuments.song, (s, { payload }) => adapter.addOne(payload, s)),
  on(SongDocuments.songs, (s, { payload }) => adapter.setAll(payload, s)),
);
