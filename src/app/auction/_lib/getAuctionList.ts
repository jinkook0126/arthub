import { IArtResponse } from '@/model/art';

const getAuctionList = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auction`);
    const data: IArtResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching creators list:', error);
    return {
      success: false,
      msg: 'fetch error',
    } as IArtResponse;
  }
};

export default getAuctionList;
