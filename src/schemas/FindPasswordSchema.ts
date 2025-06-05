import { z } from 'zod';

export const findPasswordSchema = z.object({
  email: z.string().nonempty('이메일을 입력해주세요.').email('이메일 형식으로 입력해주세요.'),
  name: z.string().nonempty('이름을 입력해주세요.'),
});

export type FindPasswordFormValues = z.infer<typeof findPasswordSchema>;
