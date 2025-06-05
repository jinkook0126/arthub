import { z } from 'zod';

export const changeRoleSchema = z.object({
  creatorName: z.string().min(1, '작가명은 필수입니다'),
  creatorTags: z.array(z.string()).optional(),
  creatorThumbnail: z.string().optional(),
  creatorDesc: z.string().optional(),
});

export type ChangeRoleFormValues = z.infer<typeof changeRoleSchema>;
