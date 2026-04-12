import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { applyDecorators } from '@nestjs/common';

export function TweetContentValidation() {
  return applyDecorators(
    Transform(({ value }) =>
      typeof value === 'string' ? value.trim() : value,
    ),
    IsString({ message: 'contentは文字列で入力してください' }),
    IsNotEmpty({ message: 'contentは必須項目です' }),
    Length(1, 10, {
      message: (args) => {
        return `${args.property}は${args.constraints[0]}〜${args.constraints[1]}文字です`;
      },
    }),
  );
}
