import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { applyDecorators } from '@nestjs/common';

/**
 * ユーザーのバリデーション
 */

/** 名前のバリデーション */
export function UserNameValidation() {
  return applyDecorators(
    Transform(({ value }) =>
      typeof value === 'string' ? value.trim() : value,
    ),
    IsString({ message: '名前は文字列で入力してください' }),
    IsNotEmpty({ message: '名前は必須項目です' }),
    Length(1, 200, {
      message: (args) => {
        return `名前は${args.constraints[0]}〜${args.constraints[1]}文字です`;
      },
    }),
  );
}

/** メールアドレスのバリデーション */
export function UserEmailValidation() {
  return applyDecorators(
    Transform(({ value }) =>
      typeof value === 'string' ? value.trim() : value,
    ),
    IsString({ message: 'メールアドレスは文字列で入力してください' }),
    IsNotEmpty({ message: 'メールアドレスは必須項目です' }),
    Length(1, 200, {
      message: (args) => {
        return `メールアドレスは${args.constraints[0]}〜${args.constraints[1]}文字です`;
      },
    }),
  );
}
