import {
  ViewportScroller
} from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Constants } from 'src/app/common/constants';


import {
  Ability
} from './../../models/ability';
import {
  Unit
} from './../../models/unit';
import {
  Wargear
} from './../../models/wargear';
import {
  Weapon
} from './../../models/weapon';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})

export class DisplayComponent implements OnInit, AfterViewInit  {
  @ViewChild('shootingPhases') shootingPhasesElement!: ElementRef;
  @ViewChild('meleePhases') meleePhasesElement!: ElementRef;
  @ViewChild('headerOffset') headerOffsetElement!: ElementRef;
  constructor(private viewportScroller: ViewportScroller, private appComponent: AppComponent, private router: Router) {
  }

  @Input() unit: Unit = new Unit();
  @Input() input: any = this.appComponent.selectedUnit;

  public error: string = '';
  public itemPinned: boolean = false;
  public unitChooserIsOpen: boolean = false;

  public constants: any = {
    'wargear': Constants.wargear,
    'weapons': Constants.weapons,
    'abilities': Constants.abilities
  };

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit() {
    if (!this.input.name) {
      this.router.navigate(['']);
    }
    try {
      this.unit = this.parseJson(this.input);
    } catch (e) {
      this.error = e;
    }
  }

  public importUnit(unit: any) {
    this.unit = this.parseJson(unit);
    this.viewportScroller.scrollToPosition([0,0]);
    this.unitChooserIsOpen = false;
  }

  public checkIfString(value: any) {
    return typeof value == 'string';
  }

  public formatRules(rules: string | string[], seperator: string = '<br/>') {
    if (Array.isArray(rules)) {
      return `${rules.join(seperator)}`;
    }
    return rules;
  }

  public scrollToAnchor(anchorName: string) {
    setTimeout(() => this.viewportScroller.scrollToAnchor(anchorName), 0);
  }

  private parseJson(unit: any): Unit {
    let result = Object.assign(new Unit(), unit);
    result.abilities = this.mapAbilities(unit['abilities']);
    result.weapons = this.mapAbilities(unit['weapons']);
    result.wargear = this.mapAbilities(unit['wargear']);
    result.traits = this.mapAbilities(unit['traits']);
    result.shootingPreAttackChecks = this.mapAbilities(unit['shootingPreAttackChecks']);
    result.shootingPreHitChecks = this.mapAbilities(unit['shootingPreHitChecks']);
    result.shootingPreWoundChecks = this.mapAbilities(unit['shootingPreWoundChecks']);
    result.meleePreAttackChecks = this.mapAbilities(unit['meleePreAttackChecks']);
    result.meleePreHitChecks = this.mapAbilities(unit['meleePreHitChecks']);
    result.meleePreWoundChecks = this.mapAbilities(unit['meleePreWoundChecks']);
    result.defensePreHitChecks = this.mapAbilities(unit['defensePreHitChecks']);
    result.defensePreSaveChecks = this.mapAbilities(unit['defensePreSaveChecks']);
    result.defensePreWoundChecks = this.mapAbilities(unit['defensePreWoundChecks']);
    result.defensePreLeadershipChecks = this.mapAbilities(unit['defensePreLeadershipChecks']);
    return result;
  }

  public togglePin(weapon: Weapon, event: MouseEvent) {
    this.unit.weapons.forEach(x => {
      if (x != weapon) {
        x.isPinned = false;
      }
    });
    weapon.isPinned = !weapon.isPinned;

    // Find offset height
    let element = event.target as HTMLElement;
    while(element != null && !element.classList.contains('weapon')) {
      element = element.parentElement as HTMLElement;
    }

    const phaseElement = weapon.type == 'Melee' ?
    this.meleePhasesElement?.nativeElement : this.shootingPhasesElement?.nativeElement;
    const value = element.offsetHeight + 60;
    const offsetElement = this.headerOffsetElement?.nativeElement;

    offsetElement.style.height = `${value}px`;
    phaseElement.style.top = `-${value}px`;

    // Scroll
    if (weapon.isPinned) {
      this.itemPinned = true;
      if (weapon.type == 'Melee') {
        setTimeout(() => this.viewportScroller.scrollToAnchor('meleePhases'), 0);
      } else {
        setTimeout(() => this.viewportScroller.scrollToAnchor('shootingPhases'), 0);
      }
    } else {
      this.itemPinned = false;
      offsetElement.style.height = 0;
    }
  }

  private mapAbilities(abiilties: any[]): any[] {
    const regex = /(\w*)\.(\w*)/;
    const results: Wargear[] | Ability[] | Weapon[] | any[] = [];
    if (abiilties && abiilties.length) {
      abiilties.forEach((ability: string | object) => {
        switch (typeof (ability)) {
          // References items in data
          case 'string':
            const match = ability.match(regex);
            if (match) {
              const dictionary = match[1].toString();
              const key = match[2];
              const value = this.constants[dictionary][key];
              if (!value) {
                throw new Error(`Could not find ${dictionary}.${key}`);
              }
              results.push(value);
            }
            break;
            // References custom items
          default:
            const value = Object.assign({}, ability);
            results.push(value);
        }
      });
    }
    return results;
  }

  public hasWeaponWithRange() {
    return this.unit.weapons.some(x => x.range > 0);
  }

  public hasWeaponWithType(type: string) {
    return this.unit.weapons.map(x => {
      return x.type;
    }).includes(type);
  }

  public getPointValue() {
    let value = 0;
    if (this.unit.weapons.length) {
      value += this.unit.weapons
        .map((x: {
          points: number;
        }) => {
          return x.points;
        })
        .reduce((x: any, y: any) => x + y);
    }

    if (this.unit.wargear.length) {
      value += this.unit.wargear
        .map((x: {
          points: number;
        }) => {
          return x.points;
        })
        .reduce((x: any, y: any) => x + y);
    }

    if (this.unit.traits.length) {
      value += this.unit.traits
        .map((x: {
          points: number;
        }) => {
          return x.points;
        })
        .reduce((x: any, y: any) => x + y);
    }

    return this.unit.points + value;
  }

  public getWeaponFormulaTooltip(weapon: any) {
    return `Base: ${this.unit.strength} (+${weapon.strength})`;
  }

  public checkForDice(value: any) {
    if (typeof value === 'string') {
      if (value.includes('D')) {
        return true;
      }
    }
    return false;
  }

  public openUnitChooser() {
    this.unitChooserIsOpen = true;
  }

  public filterRangedWeapons(weapon: any) {
    return weapon.type !== 'Melee';
  }

  public filterMeleeWeapons(weapon: any) {
    return weapon.type === 'Melee';
  }
}
