import { pb } from '@/lib/pocketbase';
import { capitalize } from '@/lib/utils';
import {
  GroupSecret,
  GroupSecretFields,
  Secret, SecretFields, User, UserFields,
} from '@/types/pocketbase';
import {
  AddOptions, RowGroupSecretOptions, RowSecretOptions, SecretValueOptions,
} from './ClientHome';

export const revalidate = 0;

function Title({ username }: { username:string }) {
  return (
    <h1 className="text-4xl md:text-5xl font-bold mb-8">
      Hola de nuevo
      {' '}
      @
      {username}
      !
    </h1>
  );
}

function RowSecret({
  secret, groupSecretsList,
}: { secret: Secret, groupSecretsList: { id: string; name: string }[] }) {
  return (
    <div className="flex pl-4 justify-between w-full">
      <div className="flex w-full max-w-2xl flex-col md:flex-row md:justify-between gap-y-2">
        <h3 className="">
          {capitalize(secret.name)}
        </h3>
        <SecretValueOptions secretValue={secret[SecretFields.VALUE]} />
      </div>
      <RowSecretOptions groupSecretsList={groupSecretsList} secret={secret} />
    </div>
  );
}

function RowGroupSecret({
  name,
  secrets,
  groupSecretsList,
  groupSecret,
}: {
  name: string;
  secrets: Secret[];
  groupSecretsList: { id: string; name: string }[];
  groupSecret: GroupSecret;
}) {
  return (
    <section className="w-full">
      <div className="flex items-center w-full gap-2">
        <h2 className="text-3xl font-bold text-zinc-700 my-4">
          {capitalize(name)}
        </h2>
        <RowGroupSecretOptions groupSecret={groupSecret} />
      </div>
      <div className="flex w-full flex-col gap-6">
        {secrets.map((secret) => (
          <RowSecret
            secret={secret}
            key={secret[SecretFields.ID]}
            groupSecretsList={groupSecretsList}
          />
        ))}
      </div>
    </section>
  );
}

export default async function Home({ user }: { user: User }) {
  const groupSecrets = await pb
    .getGroupSecrets({ username: user[UserFields.USERNAME] });

  const groupSecretsList = groupSecrets.map(({ id, name }) => ({ id, name }));

  return (
    <main className="w-full max-w-6xl flex flex-col my-10 md:my-20 mx-6">
      <div className="w-full flex justify-between items-center">
        <Title username={user[UserFields.USERNAME]} />
        <AddOptions groupSecretsList={groupSecretsList} user={user} />
      </div>
      <div className="flex flex-col w-full gap-8">
        {groupSecrets.map((groupSecret) => (
          <RowGroupSecret
            name={groupSecret[SecretFields.NAME]}
            secrets={
              groupSecret[GroupSecretFields.EXPAND]?.secret_via_group_secret || []
            }
            groupSecret={groupSecret}
            groupSecretsList={groupSecretsList}
            key={groupSecret[SecretFields.ID]}
          />
        ))}
      </div>
    </main>
  );
}
