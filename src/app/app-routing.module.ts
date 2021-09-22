import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataManagerComponent } from './components/data-manager/data-manager.component';
import { DisplayComponent } from './components/display/display.component';
import { UnitChooserComponent } from './components/unit-chooser/unit-chooser.component';

const routes: Routes = [
  { path: '', component: UnitChooserComponent },
  { path: 'unit', component: UnitChooserComponent },
  { path: 'data-manager', component: DataManagerComponent },
  { path: 'display', component: DisplayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
