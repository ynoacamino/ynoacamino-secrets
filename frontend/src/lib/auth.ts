import { SECRET_LABEL } from '@/config/global';
import { pb } from './pocketbase';

export const authWithParams = async (searchParams: { [key: string]: string }) => {
  if (!searchParams) {
    return null;
  }

  if (
    SECRET_LABEL in searchParams
  ) {
    const secretToken = searchParams[SECRET_LABEL];
    const user = await pb.getUser({ secretToken });

    return user;
  }

  return null;
};
