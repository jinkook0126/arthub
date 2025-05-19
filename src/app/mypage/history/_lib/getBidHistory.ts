import { IBidHistoryResponse } from '@/model/art';

const getAuctionList = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/auction-history`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data: IBidHistoryResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching creators list:', error);
    return {
      success: false,
      msg: 'fetch error',
    } as IBidHistoryResponse;
  }
};

export default getAuctionList;
