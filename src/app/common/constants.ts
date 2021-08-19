import { Ability } from "../models/ability"
import { Wargear } from "../models/wargear";
import { Weapon } from "../models/weapon";

export class Constants {

  public static abilities: any = {
    denyTheWitch: new Ability({
      name: 'Deny the Witch',
      rules: 'When a PSYKER unit attempts to deny a psychic power, you must take a Deny the Witch test for that unit by rolling 2D6. If the total is greater than the result of the Psychic test, the Deny the Witch test is passed and the psychic power is denied. Only one attempt can be made to deny a psychic power. If a PSYKER unit can attempt to deny more than one psychic power in a psychic phase, this will be listed on its datasheet.'
    }),
    blast: new Ability({
      name: 'Blast',
      rules: ['If target unit has 6+ models, this has at least 3 attacks. <br/>If target unit has 11+ models, this has the maximum number of attacks.']
    }),
    shieldOfFaith: new Ability({
      name: 'Shield of Faith',
      rules: ['6+ invulnerable save.',
        'Deny one psychic power as a Psyker <i>(roll one D6: pass on unmodified 6 or if greater than Psychic test)</i>.'
      ]
    }),
    actsOfFaith: new Ability({
      name: 'Acts of Faith',
      rules: 'Once per phase, replace regular dice rolls with Miracle dice.'
    }),
    leadTheRighteous: new Ability({
      name: 'Lead the Righteous',
      tags: ['Aura'],
      rules: 'Friendly &lang;Order&rang; Core units within 6" can re-roll hit rolls of 1.'
    }),
    sacredRitesDivineGuidance: new Ability({
      name: 'Divine Guidance',
      rules: 'Ranged attacks gain -1 Armor Penetration on unmodified Wound rolls of 6.',
      description: 'Seeing the weak points in their enemies’ armour, the Sisters of Battle strike out to shatter it with contemptuous ease.',
      tags: ['Sacred Rites']
    }),
    beaconOfFaith: new Ability({
      name: 'Beacon of Faith',
      rules: '<b class="text-dark-blue">Command:</b> Gain one Miracle dice. This dice can used to perform an Act of Faith even if another unit from your army has already performed one this phase. Discard unused dice at the start of your next Command phase.',
      tags: ['Warlord Trait'],
      description: 'This Adepta Sororitas leader is a shining beacon of faith, whose actions on the battlefield are nothing short of miraculous.'
    }),
    righteousJudgementMiracleAura: new Ability({
      name: 'Righteous Judgement',
      points: 25,
      rules: `<i>Miraculous Ability:</i> Friendly &lang;Order&rang; Core and &lang;Order&rang; Character models within Miracle Range ignore enemy cover.`,
      tags: ['Blessing of the Faithful', 'Aura'],
      description: 'None can escape the Emperor’s judgement, and wherever the foe attempts to seek shelter the shots of the Adepta Sororitas miraculously seek them out.'
    }),
    righteousJudgement: new Ability({
      name: 'Righteous Judgement',
      points: 25,
      rules: [
        'Ignore <i>Look Out, Sir</i> rule. Unmodified Wound rolls of 6 inflict one additional Mortal Wound.'
      ],
      tags: ['Blessing of the Faithful'],
      description: 'None can escape the Emperor’s judgement, and wherever the foe attempts to seek shelter the shots of the Adepta Sororitas miraculously seek them out.',
    }),
    slayersOfHeretics: new Ability({
      name: 'Slayers of Heretics',
      rules: ['+1 to hit rolls against Character units.'],
      tags: ['Order Conviction'],
      description: 'Wherever corrupt heretics and vile demagogues oppose the will of the Emperor and the Ecclesiarchy, this Order has vowed to tear out their silvered tongues and sever their poisonous influence.'
    }),
    convictionOfFaith: new Ability({
      name: 'Conviction of Faith',
      rules: 'Re-roll Miracle dice rolls of 1.',
      tags: ['Order Conviction'],
      description: 'The miracles of the God-Emperor are self-evident to those with the iron-hard conviction of true zealots. In the presence of this Order’s warriors, his manifestations of divinity are myriad.'
    }),
    angelicVisage: new Ability({
      name: 'Angelic Visage',
      rules: '+1 to <i>Shield of Faith</i> invulnerable save.'
    }),
    skyStrike: new Ability({
      name: 'Sky Strike',
      rules: 'Can deploy during Reinforcements step at least 9" away from enemy models.'
    }),
    objectiveSecured: new Ability({
      name: 'Objective Secured',
      rules: 'Player controls objective marker if any of their models in range have this ability.'
    }),
    zealot: new Ability({
      name: 'Zealot',
      rules: 'If this unit charged, was charged or performed a Heroic Intervention this turn, it can re-roll hit rolls.'
    }),
    solaceInAnguish: new Ability({
      name: 'Solace in Anguish',
      rules: '5+ ignore wound.'
    }),
    martyrdom: new Ability({
      name: 'Martyrdom',
      rules: 'Gain 1 Miracle dice at end of phase if this unit was destroyed outside of the Morale phase.'
    }),
    drivenOnwards: new Ability({
      name: 'Driven Onwards',
      rules: '<span class="text-dark-blue">Command:</span> Select one friendly SISTERS REPENTIA unit within 3"; that unit and this model can charge even if they Advanced this turn. Roll an additional D6 and discard one of the results for charge rolls this turn.'
    }),
    overseerOfRedemption: new Ability({
      name: 'Overseer of Redemption',
      tags: ['Aura'],
      rules: 'While a friendly SISTERS REPENTIA unit is within 6", that unit gets +1 to wound rolls.'
    }),
    beserkKillingMachines: new Ability({
      name: 'Beserk Killing Machines',
      rules: '5+ ignore wound.'
    }),
    instrumentOfPainAndPenance: new Ability({
      name: 'Instrument of Pain and Penance',
      rules: 'This unit cannot perform any actions.'
    })
  };
  public static wargear: any = {
    rosarius: new Wargear({
      name: 'Rosarius',
      rules: '4+ invulnerable save.'
    }),
    rodOfOffice: new Wargear({
      name: 'Rod of Office',
      points: 5,
      rules: '<b class="text-dark-blue">Command:</b> Select one friendly unit within 12"; until your next Command phase, that unit re-rolls hit rolls of 1.'
    }),
    simulacrumImperialis: new Wargear({
      name: "Simulacrum Imperialis",
      points: 5,
      rules: "Once per phase, the bearer’s unit can perform one Act of Faith even if another unit from your army has already performed an Act of Faith during this phase.",
      isRelic: false,
      tags: [""],
      description: ""
    })
  };
  public static weapons: any = {
    redemption: new Weapon({
      name: 'Redemption',
      type: 'Pistol',
      points: 5,
      isRelic: true,
      range: 12,
      attacks: 1,
      strength: 8,
      armorPen: -3,
      damage: 2,
      imageUrl: 'https://i.imgur.com/DyVQDMm.png',
      abilities: [
        new Ability({
          rules: 'Each hit does 1 damage to each unit between this and the closest model in the target unit (including the target unit and friendly units)'
        })
      ]
    }),
    fragGrenade: new Weapon({
      range: 6,
      name: 'Frag Grenades',
      type: 'Grenade',
      attacks: 'D6',
      abilities: [Constants.abilities.blast],
      strength: 3,
      armorPen: 0,
      damage: 1,
      imageUrl: 'https://i.imgur.com/esz6MyK.png'
    }),
    krakGrenade: new Weapon({
      range: 6,
      name: 'Krak Grenades',
      type: 'Grenade',
      attacks: 1,
      strength: 6,
      armorPen: -1,
      imageUrl: 'https://i.imgur.com/NXPaIc0.png',
      damage: 'D3'
    }),
    powerSword: new Weapon({
      name: 'Power Sword',
      type: 'Melee',
      points: 5,
      attacks: 0,
      strength: 1,
      strengthMultiplier: 1,
      armorPen: -3,
      imageUrl: 'https://i.imgur.com/ToVWm0b.png',
      damage: 1
    }),
    plasmaPistol: new Weapon({
      name: 'Plasma Pistol',
      range: 12,
      points: 5,
      type: 'Pistol',
      attacks: 1,
      strength: 7,
      armorPen: -3,
      damage: 1,
      imageUrl: 'https://i.imgur.com/DyVQDMm.png'
    }),
    plasmaPistolSupercharge: new Weapon({
      name: 'Plasma Pistol (Supercharge)',
      range: 12,
      type: 'Pistol',
      attacks: 1,
      strength: 8,
      armorPen: -3,
      damage: 2,
      abilities: [new Ability({
        rules: 'Unmodified hit rolls of 1 destroy the bearer after shooting.'
      })]
    }),
    boltPistol: new Weapon({
      name: 'Bolt Pistol',
      range: 12,
      type: 'Pistol',
      attacks: 1,
      strength: 4,
      armorPen: 0,
      damage: 1,
      imageUrl: 'https://i.imgur.com/RQc5GaZ.png'
    }),
    boltgun: new Weapon({
      name: 'Boltgun',
      type: 'Rapid Fire',
      attacks: 1,
      range: 24,
      strength: 4,
      damage: 1,
      imageUrl: 'https://i.imgur.com/LQRPZxz.png'
    }),
    heavyBolter: new Weapon({
      name: 'Heavy Bolter',
      type: 'Heavy',
      points: 10,
      attacks: 3,
      range: 36,
      strength: 5,
      armorPen: -1,
      damage: 2,
      imageUrl: 'https://i.imgur.com/UPqwIfI.png'
    }),
    stormBolter: new Weapon({
      name: 'Storm Bolter',
      type: 'Rapid Fire',
      points: 5,
      attacks: 2,
      range: 24,
      strength: 4,
      armorPen: 0,
      damage: 2,
      imageUrl: 'https://i.imgur.com/lDVsVA0.png'
    }),
    ministorumFlamer: new Weapon({
      name: 'Ministorum Flamer',
      attacks: 'D6',
      points: 5,
      type: 'Assault',
      range: 12,
      strength: 5,
      damage: 1,
      imageUrl: 'https://i.imgur.com/Ps3wjNU.png'
    }),
    chainsword: new Weapon({
      name: 'Chainsword',
      type: 'Melee',
      strength: 0,
      damage: 1,
      attacks: 1,
      imageUrl: "https://3dprint.com/wp-content/uploads/2016/03/3dp_Chainsword_imperial.jpg"
    }),
    powerMaul: new Weapon({
      name: 'Power Maul',
      points: 5,
      type: 'Melee',
      strength: 3,
      damage: 1,
      armorPen: -1
    }),
    penitentEviscerator: new Weapon({
      name: 'Penitent Eviscerator',
      type: 'Melee',
      strengthMultiplier: 2,
      hitModifier: -1,
      armorPen: -3,
      damage: 2,
      abilities: [new Ability({
        rules: '<span class="text-dark-blue">*Weapon skill has been modified to adjust for -1 to hit rolls</span>'
      })],
      imageUrl: "https://i.imgur.com/XA9GBz6.png"
    }),
    neuralWhips: new Weapon({
      name: 'Neural Whips',
      type: 'Melee',
      strength: 0,
      armorPen: -2,
      damage: 1,
      abilities: [
        new Ability({
          rules: 'If no model in the target unit (excluding VEHICLE units) has a Leadership characteristic of 8 or more, +1 to wound rolls.'
        })
      ],
      imageUrl: 'https://i.imgur.com/ZNYGcME.png'
    }),
    arcoFlails: new Weapon({
      name: 'Arco-flails',
      type: 'Melee',
      strength: 1,
      armorPen: -1,
      damage: 1,
      abilities: [
        new Ability({
          rules: 'Each attack makes 2 hit rolls instead of 1.'
        })
      ],
      imageUrl: 'https://i.imgur.com/4xob7rj.png'
    })
  }
}
