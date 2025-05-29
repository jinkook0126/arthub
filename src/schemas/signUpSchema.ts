import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().nonempty('이름을 입력해주세요.'),
    email: z.string().nonempty('이메일을 입력해주세요.').email({ message: '이메일 형식이 올바르지 않습니다.' }),
    phone: z.string().regex(/^01[016789]-?\d{3,4}-?\d{4}$/, '휴대폰 번호 형식이 올바르지 않습니다.'),
    password: z
      .string({ required_error: '비밀번호를 입력해주세요.' })
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: '비밀번호는 영문과 숫자를 조합하여 입력해주세요.',
      }),
    confirmPassword: z.string({ required_error: '비밀번호를 확인을 입력해주세요.' }),
    consentLearning: z.boolean().refine(value => value === true, {
      message: '학습용 사이트에 동의해주세요.',
    }),
    termsOfService: z.boolean().refine(value => value === true, {
      message: '이용약관에 동의해야 합니다.',
    }),
    privacyPolicy: z.boolean().refine(value => value === true, {
      message: '개인정보 수집 및 이용에 동의해야 합니다.',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type SignupFormValues = z.infer<typeof signUpSchema>;
