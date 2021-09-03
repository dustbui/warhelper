import { Ability } from "./ability";
import { PsychicPower } from "./psychic-power";
import { Wargear } from "./wargear";
import { Weapon } from "./weapon";

export class Unit {
  name: string = '-MISSING NAME-';
  keywords: string[] = [];
  woundsChangeStats: boolean = false;
  factionKeywords: string[] = [];
  move: any= '-';
  weaponSkill: number = 0;
  ballisticSkill: any = 0;
  strength: number = 0;
  toughness: number = 0;
  wounds: number | number[] = 0;
  attacks: any = 0;
  leadership: number = 0;
  saves: number = 0;
  points: number = 0;
  casts: number = 0;
  denies: number = 0;

  traits: Ability[] = [];
  wargear: Wargear[] = [];
  weapons: Weapon[] = [];

  abilities: any[] = [];
  psychicPowers: PsychicPower[]  = [];

  shootingPreAttackChecks: any[] = [];
  shootingPreHitChecks: any[] = [];
  shootingPreWoundChecks: any[] = [];

  meleePreAttackChecks: any[] = [];
  meleePreHitChecks: any[] = [];
  meleePreWoundChecks: any[] = [];

  defensePreHitChecks: any[] = [];
  defensePreSaveChecks: any[] = [];
  defensePreWoundChecks: any[] = [];
  defensePreLeadershipChecks: any[] = [];

  unitLinks: any[] = [];
}
