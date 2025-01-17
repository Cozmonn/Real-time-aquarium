import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaterQualityComponent } from './water-quality/water-quality.component';

const routes: Routes = [
  { path: '', component: WaterQualityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
