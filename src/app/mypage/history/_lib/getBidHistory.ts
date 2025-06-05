import { IBidHistoryResponse } from '@/model/art';
import { auth } from '@/auth';

const getAuctionList = async () => {
  const session = await auth();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/auction-history?userId=${session?.user.id}`, {
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
