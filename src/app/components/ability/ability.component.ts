import { Component, Input, OnInit } from '@angular/core';
import { Ability } from '../../models/ability';
import { Wargear } from '../../models/wargear';

@Component({
  selector: 'app-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.scss']
})
export class AbilityComponent implements OnInit {
  @Input() ability!: Ability | Wargear;

  constructor() { }

  ngOnInit() {
  }

  public formatRules(rules: string | string[], seperator: string = '<br/>') {
    if (Array.isArray(rules)) {
      return `${rules.join(seperator)}`;
    }
    return rules;
  }
}
