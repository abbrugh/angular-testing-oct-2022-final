import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { SongListItemModel } from '../models';
import * as fromList from './reducers/list.reducer';
export const featureName = 'songsList';

export interface SongsState {
  list: fromList.SongListState;
}

export const reducers: ActionReducerMap<SongsState> = {
  list: fromList.reducer,
};

const selectFeature = createFeatureSelector<SongsState>(featureName);

const selectListBranch = createSelector(selectFeature, (f) => f.list);

const { selectAll: selectSongListEntityArray } =
  fromList.adapter.getSelectors(selectListBranch);

export const selectSongListModel = createSelector(
  selectSongListEntityArray,
  (songs) => songs as SongListItemModel[],
);
