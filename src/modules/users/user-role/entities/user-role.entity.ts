import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UserRoleEntity {
  @ApiProperty({
    required: true,
    example: 'userRoleId',
    description: 'The userRoleId of the UserRole',
  })
  @IsString()
  userRoleId: string;

  @ApiProperty({
    required: true,
    example: 'userId',
    description: 'The userId of the UserRole',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    required: true,
    example: 'role',
    description: 'The role of the UserRole',
  })
  @IsString()
  role: string;
}
