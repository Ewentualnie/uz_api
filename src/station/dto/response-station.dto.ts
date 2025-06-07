import { ApiProperty } from '@nestjs/swagger';

export class StationResponse {
  @ApiProperty({ example: 1, description: 'ID' })
  id: number;

  @ApiProperty({ example: 'Київ', description: 'Назва станції' })
  name: string;

  @ApiProperty({ example: '2200000', description: 'Код станції' })
  code: string;
}
