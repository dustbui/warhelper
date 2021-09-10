import {
  Ability
} from "./ability";

export class Weapon {
  public constructor(init ? : Partial < Weapon > ) {
    Object.assign(this, init);
  }

  name: string = '';
  points: number = 0;
  range: number = 0;
  type: string = '';
  isRelic: boolean = false;
  attacks: number | string = 0;
  hitModifier: number = 0;
  abilities: Ability[] = [];
  strength: number | string = 0;
  strengthMultiplier: number = 1;
  armorPen: number | string = 0;
  damage: number | string = 0;
  damageModifier: number = 0;
  imageUrl: string = '';

  // Web UI interaction
  isPinned: boolean = false;
}
