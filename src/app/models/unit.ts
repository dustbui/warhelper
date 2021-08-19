import { Ability } from "./ability";
import { Wargear } from "./wargear";
import { Weapon } from "./weapon";

export class Unit {
  name: string = '-MISSING NAME-';
  keywords: string[] = [];
  factionKeywords: string[] = [];
  move: number | string = '-';
  weaponSkill: number = 0;
  ballisticSkill: number = 0;
  strength: number = 0;
  toughness: number = 0;
  wounds: number = 0;
  attacks: number = 0;
  leadership: number = 0;
  saves: number = 0;
  points: number = 0;

  traits: Ability[] = [];
  wargear: Wargear[] = [];
  weapons: Weapon[] = [];

  abilities: any[] = [];

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
}
