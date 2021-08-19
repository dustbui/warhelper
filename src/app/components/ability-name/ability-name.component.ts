import { Component, Input, OnInit } from '@angular/core';
import { Ability } from '../../models/ability';
import { Wargear } from '../../models/wargear';

@Component({
  selector: 'app-ability-name',
  templateUrl: './ability-name.component.html',
  styleUrls: ['./ability-name.component.scss']
})
export class AbilityNameComponent implements OnInit {
  @Input() ability!: Ability | Wargear;
  @Input() abilityName!: string;
  @Input() isAura!: boolean;

  constructor() { }

  ngOnInit() {
    this.abilityName = this.abilityName || this.ability.name;
  }

  public checkAura() {
    return this.isAura || this.ability.tags && this.ability.tags.includes('Aura');
  }
}
