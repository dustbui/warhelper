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
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  AppComponent
} from 'src/app/app.component';
import {
  Constants
} from 'src/app/common/constants';


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
  styleUrls: ['./display.component.scss', './display.component.mobile.scss']
})

export class DisplayComponent implements OnInit, AfterViewInit {
  @ViewChild('shootingPhases') shootingPhasesElement!: ElementRef;
  @ViewChild('meleePhases') meleePhasesElement!: ElementRef;
  @ViewChild('headerOffset') headerOffsetElement!: ElementRef;
  constructor(private viewportScroller: ViewportScroller, private appComponent: AppComponent, private router: Router) {}

  @Input() unit: Unit = new Unit();
  @Input() input: any = this.appComponent.selectedUnit;

  public error: any = '';
  public itemPinned: boolean = false;
  public unitChooserIsOpen: boolean = false;
  public woundString: string = '';

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
      this.addWeaponPrechecks(this.unit);
      this.addDefaultMelee(this.unit);
    } catch (e) {
      this.error = e;
    }
  }

  public selectUnit(unitName: string) {
    this.unit.weapons.forEach(x => {
        x.isPinned = false;
    });
    this.itemPinned = false;

    const unit = this.appComponent.unitMap[unitName];
    this.unit = this.parseJson(unit);
    this.scrollToAnchor('name');
  }

  private addDefaultMelee(unit: Unit) {
    const meleeWeapons = this.unit.weapons.filter(x => x.type === 'Melee');
    if (!meleeWeapons.length && this.unit.strength > 0) {
      this.unit.weapons.push(new Weapon({
        name: 'Melee',
        type: 'Melee',
        damage: 1
      }));
    }
  }

  // Set characteristics based on wounds on model
  private setWoundValues(unit: Unit, woundValue: number) {
    if (!Array.isArray(unit.wounds)) { return; }
    let arrayIndex = 0;
    const remainingWounds = unit.wounds[0] - woundValue;
    unit.wounds.forEach((woundAmount, index) => {
      if (remainingWounds <= woundAmount) {
        arrayIndex = index;
      }
    });
    unit.ballisticSkill = Array.isArray(unit.ballisticSkill) ? unit.ballisticSkill[arrayIndex] : unit.ballisticSkill;
    unit.weaponSkill = Array.isArray(unit.weaponSkill) ? unit.weaponSkill[arrayIndex] : unit.weaponSkill;
    unit.move = unit.move[arrayIndex];
    unit.attacks = Array.isArray(unit.attacks) ? unit.attacks[arrayIndex] : unit.attacks;
    unit.wounds = unit.wounds[0];
  }

  public setWounds(input: string) {
    this.woundString += input;
  }

  public submitWounds(wounds: string) {
    const woundValue = parseInt(wounds);
    this.unit.woundsChangeStats = false;
    this.setWoundValues(this.unit, woundValue);
  }

  public importUnit(unit: any) {
    this.unit = this.parseJson(unit);
    this.viewportScroller.scrollToPosition([0, 0]);
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

  private addWeaponPrechecks(unit: Unit) {
    let dupes: any = {};
    const isVehicleOrMonster = unit.keywords.includes('Vehicle') || unit.keywords.includes('Monster');
    // Add Vehicle shooting in melee
    if (isVehicleOrMonster) {
      unit.shootingPreAttackChecks.push(new Ability({
        name: "Vehicle/Monster",
        rules: "Can shoot ranged weapons at enemy units this is engaged with."
      }));
    }

    unit.weapons.forEach(x => {
      const name = `${x.name} - ${x.type}`;
      if (dupes[name]) {
        return;
      }
      dupes[name] = true;

      switch (x.type) {
        case "Rapid Fire":
          unit.shootingPreAttackChecks.push(new Ability({
            name: name,
            rules: 'Double number of attacks if within half range.'
          }));
          break;
        case "Heavy":
          if (unit.keywords.includes('Infantry')) {
            unit.shootingPreHitChecks.push(new Ability({
              name: name,
              rules: '-1 to hit rolls if this unit has moved this turn.'
            }));
          }
          if (isVehicleOrMonster) {
            unit.shootingPreHitChecks.push(new Ability({
              name: name,
              rules: "-1 to hit rolls if engaged."
            }));
          }
          break;
        case "Assault":
          unit.shootingPreHitChecks.push(new Ability({
            name: name,
            rules: 'Can shoot if advanced. -1 to hit rolls if unit advanced this turn.'
          }));
          break;
        case "Pistol":
          unit.shootingPreAttackChecks.push(new Ability({
            name: name,
            rules: 'Can shoot in engagement. Cannot be shot alongside any other type of weapon.'
          }));
          break;
        case "Grenade":
          unit.shootingPreAttackChecks.push(new Ability({
            name: name,
            rules: 'Only one model can use a Grenade when its unit shoots.'
          }));
      }
    })
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
    while (element != null && !element.classList.contains('weapon')) {
      element = element.parentElement as HTMLElement;
    }

    const phaseElement = weapon.type == 'Melee' ?
      this.meleePhasesElement ?.nativeElement : this.shootingPhasesElement?.nativeElement;
    const value = element.offsetHeight + 60;
    console.log(value);
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
          return x.points || 0;
        })
        .reduce((x: any, y: any) => x + y);
    }

    if (this.unit.wargear.length) {
      value += this.unit.wargear
        .map((x: {
          points: number;
        }) => {
          return x.points || 0;
        })
        .reduce((x: any, y: any) => x + y);
    }

    if (this.unit.traits.length) {
      value += this.unit.traits
        .map((x: {
          points: number;
        }) => {
          return x.points || 0;
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
