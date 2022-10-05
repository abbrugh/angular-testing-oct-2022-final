import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter.component';
import { RouterModule, Routes } from '@angular/router';
import { CountByComponent } from './components/count-by/count-by.component';
import { StoreModule } from '@ngrx/store';
import { featureName, reducers } from './state';
import { CounterEffects } from './state/effects/counter.effects';
import { EffectsModule } from '@ngrx/effects';
import { CounterAdapter } from './servicers/counter.adapter';

const routes: Routes = [
  {
    path: '',
    component: CounterComponent,
    children: [
      {
        path: 'by',
        component: CountByComponent,
      },
    ],
  },
];

const counterToUse = new CounterAdapter('counter-key');
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([CounterEffects]),
  ],
  declarations: [
    CounterComponent,
    CountByComponent,
  ],
  providers: [{ provide: CounterAdapter, useValue: counterToUse }],
})
export class CounterModule {}
