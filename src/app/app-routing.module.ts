import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsOverviewComponent } from './pages/components-overview/components-overview.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentsOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
