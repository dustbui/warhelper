export class Ability {
  public constructor(init ? : Partial < Ability > ) {
    Object.assign(this, init);
  }
  name: string = '';
  points: number = 0;
  rules: string | string[] = [];
  tags: string[] = [];
  description: string = '';
}
