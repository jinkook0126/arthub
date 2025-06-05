import { IMainResponse } from '@/model/main';

export default async function getMain() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/main`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch main');
    }
    const data: IMainResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching main:', error);
    return {
      success: false,
      error: 'fetch error',
    } as IMainResponse;
  }
}
