import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { PaginationShowcaseComponent } from './pagination-showcase.component';

const routes: Route[] = [
  {
    path: 'pagination-showcase.component',
    component: PaginationShowcaseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginationRoutingModule {}
