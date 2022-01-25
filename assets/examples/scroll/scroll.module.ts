import { NgModule } from '@angular/core';
import { NbCardModule, NbLayoutModule } from '@beast/theme';
import { ScrollRoutingModule } from './scroll-routing.module';
import { ScrollWindowComponent } from './scroll-window.component';

@NgModule({
  declarations: [ScrollWindowComponent],
  imports: [NbLayoutModule, NbCardModule, ScrollRoutingModule],
})
export class ScrollModule {}
