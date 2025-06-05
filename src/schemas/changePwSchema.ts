import { z } from 'zod';

export const changePwSchema = z
  .object({
    password: z.string().nonempty('현재 비밀번호를 입력해주세요.'),
    newPassword: z
      .string({ required_error: '비밀번호를 입력해주세요.' })
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: '비밀번호는 영문과 숫자를 조합하여 입력해주세요.',
      }),
    confirmPassword: z.string({ required_error: '비밀번호를 확인을 입력해주세요.' }),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type ChangePwFormValues = z.infer<typeof changePwSchema>;
