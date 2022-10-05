import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { PlaylistFeatureEvents } from '../actions/feature.actions';
import { SongDocuments, SongEvents } from '../actions/songs.actions';
import { SongListEntity } from '../reducers/list.reducer';
@Injectable()
export class SongEffects {
  private readonly url = 'http://localhost:1337/songs/';

  addSong$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SongEvents.added),
      mergeMap(({ payload }) =>
        this.http
          .post<SongListEntity>(this.url, payload)

          .pipe(
            map((payload) => SongDocuments.song({ payload })),
            catchError((r) =>
              of(SongEvents.error({ message: 'Could Not Add That Song' })),
            ),
          ),
      ),
    );
  });
  loadSongs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlaylistFeatureEvents.entered),
      switchMap(() =>
        this.http
          .get<{ data: SongListEntity[] }>(this.url)
          .pipe(map(({ data }) => SongDocuments.songs({ payload: data }))),
      ),
    );
  });
  constructor(
    private readonly http: HttpClient,
    private readonly actions$: Actions,
  ) {}
}
