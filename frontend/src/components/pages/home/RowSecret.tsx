'use client';

import { capitalize } from '@/lib/utils';
import { Secret, SecretFields } from '@/types/pocketbase';
import { RowSecretOptions } from './RowOptions';
import SecretValueOptions from './SecretValueOptions';

export default function RowSecret({
  secret,
}: { secret: Secret }) {
  return (
    <div className="flex pl-4 justify-between w-full">
      <div className="flex w-full max-w-2xl flex-col md:flex-row md:justify-between gap-y-2">
        <h3 className="">
          {capitalize(secret.name)}
        </h3>
        <SecretValueOptions secretValue={secret[SecretFields.VALUE]} />
      </div>
      <RowSecretOptions secret={secret} />
    </div>
  );
}
