import { SongListEntity } from '../state/reducers/list.reducer';

export type SongListItemModel = SongListEntity;

export type PlaylistCreateModel = Omit<SongListEntity, 'id'>;
