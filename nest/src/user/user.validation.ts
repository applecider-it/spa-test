import { IsNotEmpty, IsString, Length, IsEmail } from 'class-validator';
import { applyDecorators, BadRequestException } from '@nestjs/common';
import { eq, ne, and } from 'drizzle-orm';

import { users } from '@/db/schema';

/**
 * ユーザーのバリデーション
 */

/** 名前のバリデーション */
export function UserNameValidation() {
  return applyDecorators(
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
    IsString({ message: 'メールアドレスは文字列で入力してください' }),
    IsNotEmpty({ message: 'メールアドレスは必須項目です' }),
    Length(1, 200, {
      message: (args) => {
        return `メールアドレスは${args.constraints[0]}〜${args.constraints[1]}文字です`;
      },
    }),
    IsEmail({}, { message: 'メールアドレスの形式が正しくありません' }),
  );
}

/** メールアドレスのバリデーション （追加処理） */
export async function UserEmailCustomValidation(
  db,
  id: number | null,
  email: string,
) {
  const conditions: any[] = [];

  conditions.push(eq(users.email, email));

  if (id) conditions.push(ne(users.id, id));

  let query = db.select().from(users).limit(1);
  if (conditions.length) query = query.where(and(...conditions));

  const user = await query.then((res) => res[0] ?? null);

  if (user) {
    throw new BadRequestException({
      errors: {
        email: ['このメールアドレスは既に使用されています'],
      },
    });
  }
}
