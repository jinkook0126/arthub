import { z } from 'zod';

export const auctionRgSchema = z.object({
  url: z.string().nonempty('사진을 업로드해주세요.'),
  artTitle: z.string().min(1, { message: '제목을 입력해주세요.' }),
  artDesc: z.string().min(1, { message: '설명을 입력해주세요.' }),
  artSize: z.string().min(1, { message: '크기를 입력해주세요.' }),
  artMaterial: z.string().min(1, { message: '재료를 입력해주세요.' }),
  artCreatedAt: z.string().min(1, { message: '제작 날짜를 입력해주세요.' }),
  startingPrice: z
    .number({
      required_error: '시작 가격을 입력해주세요.',
      invalid_type_error: '시작 가격은 숫자여야 합니다.',
    })
    .min(1, { message: '시작 가격은 1 이상이어야 합니다.' })
    .refine(val => !Number.isNaN(val), {
      message: '시작 가격을 입력해주세요.',
    }),
  buyoutPrice: z
    .number({
      required_error: '즉시 구매 가격을 입력해주세요.',
      invalid_type_error: '즉시 구매 가격은 숫자여야 합니다.',
    })
    .min(1, { message: '즉시 구매 가격은 1 이상이어야 합니다.' })
    .refine(val => !Number.isNaN(val), {
      message: '즉시 구매 가격을 입력해주세요.',
    }),
  auctionEndAt: z.string().min(1, { message: '종료 날짜를 입력해주세요.' }),
});

export type AuctionRgFormValues = z.infer<typeof auctionRgSchema>;
