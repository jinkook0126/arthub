import { IArt } from '@/model/art';
import { useQuery } from '@tanstack/react-query';

export default function useArtDetail({ id }: { id: number }) {
  return useQuery({
    queryKey: ['auction', id],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auction/detail?id=${id}`).then(
        res => res.json() as Promise<{ art: IArt; success: boolean; msg: string }>,
      ),
  });
}
