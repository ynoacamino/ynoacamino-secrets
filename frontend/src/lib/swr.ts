import { usePb } from '@/components/providers/PbProvider';
import { QuerySWRKeys } from '@/types/swr';
import useSWR from 'swr';

export const useGroupSecrets = () => {
  const { getGroupSecrets } = usePb();

  const {
    data,
    isLoading,
    mutate,
  } = useSWR(QuerySWRKeys.GET_GROUP_SECRETS, getGroupSecrets);

  return {
    groupSecrets: data,
    isLoading,
    mutate,
  };
};
