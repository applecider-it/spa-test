import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { applyDecorators } from '@nestjs/common';

/**
 * ツイートのバリデーション
 */

/** 内容のバリデーション */
export function TweetContentValidation() {
  return applyDecorators(
    Transform(({ value }) =>
      typeof value === 'string' ? value.trim() : value,
    ),
    IsString({ message: '内容は文字列で入力してください' }),
    IsNotEmpty({ message: '内容は必須項目です' }),
    Length(1, 10, {
      message: (args) => {
        return `内容は${args.constraints[0]}〜${args.constraints[1]}文字です`;
      },
    }),
  );
}
