import {
  GroupSecretFields,
  SecretFields,
  UserFields,
} from '@/types/pocketbase';
import { usePb } from '@/components/providers/PbProvider';
import { useGroupSecrets } from '@/lib/swr';
import Title from './Title';
import RowGroupSecret from './RowGroupSecret';
import AddOptions from './AddOptions';
import SkeletonHome from './SkeletonHome';

export default function Home() {
  const { getUser, isLoadingInit } = usePb();
  const { isLoading, groupSecrets } = useGroupSecrets();

  if (isLoading || isLoadingInit || !groupSecrets) return <SkeletonHome />;

  return (
    <main className="w-full max-w-6xl flex flex-col my-10 md:my-14 mx-6">
      <div className="w-full flex justify-between items-center">
        <Title username={getUser()[UserFields.USERNAME]} />
        <AddOptions />
      </div>
      <div className="flex flex-col w-full gap-8">
        {groupSecrets.map((groupSecret) => (
          <RowGroupSecret
            name={groupSecret[SecretFields.NAME]}
            secrets={
              groupSecret[GroupSecretFields.EXPAND]?.secrets_via_group_secret || []
            }
            groupSecret={groupSecret}
            key={groupSecret[SecretFields.ID]}
          />
        ))}
      </div>
    </main>
  );
}
