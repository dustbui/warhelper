import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import canoness from '../../../data/canoness.json';
import battleSister from '../../../data/battle-sister.json';
import seraphimSuperior from '../../../data/seraphim-superior.json';
import seraphim from '../../../data/seraphim.json';
import arcoFlagellants from '../../../data/arco-flagellants.json';
import repentiaSuperior from '../../../data/repentia-superior.json';
import sisterRepentia from '../../../data/sister-repentia.json';
import sisterSuperior from 'src/data/sister-superior.json';
import wolfGuard from '../../../data/wolf-guard.json';
import wolfLordOnThunderwolf from 'src/data/wolf-lord-on-thunderwolf.json';
import bloowClaws from 'src/data/blood-claws.json';
import cyberwolf from 'src/data/cyberwolf.json';
import celestine from 'src/data/celestine.json';
import penitentEngine from 'src/data/penitent-engine.json';
import geminaeSuperia from 'src/data/geminae-superia.json';
import sororitasRhino from 'src/data/sororitas-rhino.json';
import assaultIntercessors from 'src/data/assault-intercessors.json';
import eliminators from 'src/data/eliminators.json';
import eradicators from 'src/data/eradicators.json';
import terminator from 'src/data/terminator.json';
import wolfPriest from 'src/data/wolf-priest.json';
import dialogus from 'src/data/dialogus.json';
import librarian from 'src/data/librarian.json';
import redemptorDreadnought from 'src/data/redemptor-dreadnought.json';
import incursors from 'src/data/incursors.json';
import mortifier from 'src/data/mortifier.json';
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
    arcoFlagellants, battleSister, canoness, celestine, seraphim, seraphimSuperior, sisterRepentia, sisterSuperior, repentiaSuperior, wolfGuard, wolfLordOnThunderwolf, cyberwolf, bloowClaws, penitentEngine, geminaeSuperia, sororitasRhino, librarian, dialogus, wolfPriest,
    redemptorDreadnought, incursors, mortifier, assaultIntercessors, eliminators, eradicators
  ];
  private originalUnits = this.units;

  constructor(private appComponent: AppComponent, private router: Router) { }

  ngOnInit() {
    // Sort alphabetically
    this.units.sort((x: any, y: any): number => {
      if (x.name < y.name) return -1;
      else if (x.name > y.name) return 1;
      return 0;
    });

    this.appComponent.unitMap = this.createUnitMap(this.units);
  }

  public filterByKeyword(keywords: string[]) {
    const result = this.originalUnits.filter(x => {
        let hasKeyword = false;
        keywords.forEach(keyword => {
          if (x.keywords.includes(keyword)
          || x.factionKeywords.includes(keyword)) hasKeyword = true;
        });
        return hasKeyword;
      }
    );
    this.units = result;
  }

  private createUnitMap(units: any[]) {
    const map: any = {};
    units.forEach(x => {
      map[x.name] = x;
    });
    return map;
  }

  public selectUnit(unit: any) {
    this.appComponent.selectedUnit = unit;
    this.selectedUnitEvent.emit(unit);
  }
}
