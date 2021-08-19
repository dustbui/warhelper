export class Wargear {
  public constructor(init ? : Partial < Wargear > ) {
    Object.assign(this, init);
  }
  name: string = '';
  points: number = 0;
  rules: string = '';
  isRelic: boolean = false;
  tags: string[] = [];
  description: string = '';
}
