'use client';

import { capitalize } from '@/lib/utils';
import { GroupSecret, Secret, SecretFields } from '@/types/pocketbase';
import { RowGroupSecretOptions } from './RowOptions';
import RowSecret from './RowSecret';

export default function RowGroupSecret({
  name,
  secrets,
  groupSecret,
}: {
  name: string;
  secrets: Secret[];
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
          />
        ))}
      </div>
    </section>
  );
}
