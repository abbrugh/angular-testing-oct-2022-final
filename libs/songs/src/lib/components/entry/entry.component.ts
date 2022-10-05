import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PlaylistCreateModel } from '../../models';
import { SongEvents } from '../../state/actions/songs.actions';

@Component({
  selector: 'ht-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
})
export class EntryComponent {
  form = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ],
    }),
    artist: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    album: new FormControl<string>('', {
      nonNullable: true,
    }),
  });
  constructor(private store: Store) {}

  addThisSong(foci: HTMLInputElement) {
    console.log(this.form.value);
    if (this.form.valid) {
      const payload: PlaylistCreateModel = {
        title: this.form.controls.title.value,
        artist: this.form.controls.artist.value,
        album: this.form.controls.album.value,
      };
      this.store.dispatch(SongEvents.added({ payload }));

      this.form.reset();
      foci.focus();
    }
  }
}
