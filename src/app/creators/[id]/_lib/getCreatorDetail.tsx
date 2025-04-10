import { ICreatorDetailResponse } from '@/model/artist';
import { QueryFunctionContext } from '@tanstack/react-query';

const getCreatorDetail = async ({ queryKey }: QueryFunctionContext) => {
  try {
    const [, id] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/creator/${id}`);
    const data: ICreatorDetailResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching creators list:', error);
    return {
      success: false,
      msg: 'fetch error',
    } as ICreatorDetailResponse;
  }
};

export default getCreatorDetail;
