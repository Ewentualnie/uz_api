import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTrainDto } from './create-train.dto';

export class UpdateTrainDto extends PartialType(CreateTrainDto) {
  @ApiProperty({
    example: ['04К', '05П', '06Л'],
    description: 'Список вагонів поїзда',
    type: [String],
  })
  cars: string[];
}
