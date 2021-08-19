import {
  NgModule
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  AbilityNameComponent
} from './components/ability-name/ability-name.component';
import {
  AbilityComponent
} from './components/ability/ability.component';

import {
  AppRoutingModule
} from './app-routing.module';
import {
  AppComponent
} from './app.component';
import { CallbackPipe } from './pipes/filter.pipe';
import { UnitChooserComponent } from './components/unit-chooser/unit-chooser.component';
import { DisplayComponent } from './components/display/display.component';

@NgModule({
  declarations: [
    AppComponent,
    CallbackPipe,
    DisplayComponent,
    AbilityComponent,
    AbilityNameComponent,
    UnitChooserComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
