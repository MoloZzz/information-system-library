import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { Dictionaries } from 'src/common/enums';

export class NameParamDto {
  @ApiProperty({
    enum: Dictionaries,
  })
  @IsDefined()
  name: Dictionaries;
}
