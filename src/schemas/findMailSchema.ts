import { z } from 'zod';

export const findMailSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  phone: z.string().regex(/^01[016789]-?\d{3,4}-?\d{4}$/, '휴대폰 번호 형식이 올바르지 않습니다.'),
});

export type FindMailSchema = z.infer<typeof findMailSchema>;
