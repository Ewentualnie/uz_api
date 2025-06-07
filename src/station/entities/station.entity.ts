import { Exclude } from 'class-transformer';

export class Station {
  @Exclude()
  id: number;
  name: string;
  code: number;
}
