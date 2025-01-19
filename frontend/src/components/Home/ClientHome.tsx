'use client';

import { CopyButton } from '@/components/ui/copyButton';
import { SecretHandle } from '@/components/ui/secretHandle';

import {
  Ellipsis,
  EllipsisVertical,
  Plus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { GroupSecret, Secret, User } from '@/types/pocketbase';
import { AddGroupSecretDialog, DeleteGroupSecretDialog, EditGroupSecretDialog } from '@/components/Dialogs/GroupSecret';
import { AddSecretDialog, DeleteSecretDialog, EditSecretDialog } from '@/components/Dialogs/Secret';

export function AddOptions(
  { groupSecretsList, user }: { groupSecretsList: { id: string; name: string }[], user: User },
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Plus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuItem asChild>
          <AddGroupSecretDialog user={user} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AddSecretDialog groupSecretsList={groupSecretsList} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function RowSecretOptions(
  { groupSecretsList, secret }:
  { groupSecretsList: { id: string; name: string }[], secret: Secret },
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20">
        <DropdownMenuItem asChild>
          <EditSecretDialog groupSecretsList={groupSecretsList} secret={secret} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteSecretDialog secret={secret} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function RowGroupSecretOptions(
  { groupSecret }:
  { groupSecret: GroupSecret },
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20">
        <DropdownMenuItem asChild>
          <EditGroupSecretDialog groupSecret={groupSecret} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteGroupSecretDialog groupSecret={groupSecret} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SecretValueOptions({ secretValue }: { secretValue: string }) {
  return (
    <div className="flex items-center gap-2">
      <CopyButton value={secretValue} />
      <SecretHandle secret={secretValue} />
    </div>
  );
}
