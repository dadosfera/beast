/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NbLayoutModule,
  NbMenuModule,
  NbTabsetModule,
  NbSidebarModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbButtonModule,
  NbSelectModule,
  NbInputModule,
  NbDialogModule,
  NbSpinnerModule,
} from '@beast/theme';

import { NbEvaIconsModule } from '@beast/eva-icons';

import {
  NgdHeaderComponent,
  NgdHeroComponent,
  NgdIconCardComponent,
  NgdTextCardComponent,
  NgdFooterComponent,
  NgdFragmentTargetDirective,
  NgdPageTocComponent,
  NgdPageTabsComponent,
  NgdColorSwatchDirective,
  NgdDescriptionDirective,
  NgdSearchComponent,
} from './components';

import {
  NgdHighlightService,
  NgdTextService,
  NgdTabbedService,
  NgdStructureService,
  NgdCodeLoaderService,
  NgdIframeCommunicatorService,
  NgdStylesService,
  NgdVersionService,
  NgdVisibilityService,
  NgdPaginationService,
  NgdAnalytics,
  NgdMenuService,
  NgdMetadataService,
  NgdArticleService,
  NgdLastViewedSectionService,
} from './services';

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbMenuModule,
    NbTabsetModule,
    NbIconModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    NbEvaIconsModule,
    NbDialogModule,
    NbSpinnerModule,
    RouterModule,
  ],
  declarations: [
    NgdHeaderComponent,
    NgdHeroComponent,
    NgdIconCardComponent,
    NgdTextCardComponent,
    NgdFooterComponent,
    NgdFragmentTargetDirective,
    NgdPageTocComponent,
    NgdPageTabsComponent,
    NgdColorSwatchDirective,
    NgdDescriptionDirective,
    NgdSearchComponent,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NbIconModule,
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbMenuModule,
    NbTabsetModule,
    NbCheckboxModule,
    NgdHeaderComponent,
    NgdHeroComponent,
    NgdIconCardComponent,
    NgdTextCardComponent,
    NgdFooterComponent,
    NgdFragmentTargetDirective,
    NgdPageTocComponent,
    NgdPageTabsComponent,
    NgdColorSwatchDirective,
    NgdDescriptionDirective,
  ],
})
export class NgdThemeModule {
  static forRoot(): ModuleWithProviders<NgdThemeModule> {
    return {
      ngModule: NgdThemeModule,
      providers: [
        NgdHighlightService,
        NgdTextService,
        NgdTabbedService,
        NgdStructureService,
        NgdCodeLoaderService,
        NgdIframeCommunicatorService,
        NgdStylesService,
        NgdVersionService,
        NgdPaginationService,
        NgdAnalytics,
        NgdMenuService,
        NgdVisibilityService,
        NgdMetadataService,
        NgdArticleService,
        NgdLastViewedSectionService,
      ],
    };
  }
}
