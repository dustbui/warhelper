import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import canoness from '../../../data/canoness.json';
import battleSister from '../../../data/battle-sister.json';
import seraphimSuperior from '../../../data/seraphim-superior.json';
import seraphim from '../../../data/seraphim.json';
import arcoFlagellants from '../../../data/arco-flagellants.json';
import repentiaSuperior from '../../../data/repentia-superior.json';
import sisterRepentia from '../../../data/sister-repentia.json';
import wolfGuard from '../../../data/wolf-guard.json';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unit-chooser',
  templateUrl: './unit-chooser.component.html',
  styleUrls: ['./unit-chooser.component.scss']
})
export class UnitChooserComponent implements OnInit {
  @Output() selectedUnitEvent = new EventEmitter();
  public units: any[] = [
    arcoFlagellants, canoness, battleSister, seraphim, seraphimSuperior, sisterRepentia, repentiaSuperior, wolfGuard
  ];

  constructor(private appComponent: AppComponent, private router: Router) { }

  ngOnInit() {
    // Sort alphabetically
    this.units.sort((x: any, y: any): number => {
      if (x.name < y.name) return -1;
      else if (x.name > y.name) return 1;
      return 0;
    })
  }

  public selectUnit(unit: any) {
    this.appComponent.selectedUnit = unit;
    this.selectedUnitEvent.emit(unit);
  }
}
