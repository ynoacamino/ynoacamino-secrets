import { usePb } from '@/components/providers/PbProvider';
import { GroupSecret } from '@/types/pocketbase';
import { QuerySWRKeys } from '@/types/swr';
import useSWR from 'swr';

export const useGroupSecrets = () => {
  const { getGroupSecrets } = usePb();

  const {
    data,
    isLoading,
    mutate,
  } = useSWR(QuerySWRKeys.GET_GROUP_SECRETS, getGroupSecrets);

  const sortedData: GroupSecret[] | undefined = data
    ?.map((d) => {
      const sortedSecrets = d.expand?.secrets_via_group_secret
        ? [...d.expand.secrets_via_group_secret]
          .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        : [];

      return {
        ...d,
        expand: {
          ...d.expand,
          secrets_via_group_secret: sortedSecrets,
        },
      };
    })
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  return {
    groupSecrets: sortedData,
    isLoading,
    mutate,
  };
};
