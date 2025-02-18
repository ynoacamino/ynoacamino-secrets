'use client';

import {
  Ellipsis,
  EllipsisVertical,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { GroupSecret, GroupSecretFields, Secret } from '@/types/pocketbase';
import { DeleteGroupSecretDialog, EditGroupSecretDialog } from '@/components/dialogs/GroupSecret';
import { AddSecretDialog, DeleteSecretDialog, EditSecretDialog } from '@/components/dialogs/Secret';

export function RowSecretOptions(
  { secret }:
  { secret: Secret },
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
          <EditSecretDialog secret={secret} />
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
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem asChild>
          <AddSecretDialog defaultGroupSecretId={groupSecret[GroupSecretFields.ID]} />
        </DropdownMenuItem>
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
