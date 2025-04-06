import { ICreatorResponse } from '@/model/artist';

const getCreatorsList = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/creator`);
    const data: ICreatorResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching creators list:', error);
    return {
      success: false,
      msg: 'fetch error',
      lists: [],
    };
  }
};

export default getCreatorsList;
