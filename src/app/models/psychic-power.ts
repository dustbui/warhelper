export class PsychicPower {
  public constructor(init ? : Partial < PsychicPower > ) {
    Object.assign(this, init);
  }
  name: string = '';
  range: number = 0;
  warpCharge: number = 0;
  rules: string | string[] = [];
  tags: string[] = [];
  description: string = '';
}
