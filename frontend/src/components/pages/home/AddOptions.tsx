'use client';

import {
  Plus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { AddGroupSecretDialog } from '@/components/dialogs/GroupSecret';
import { AddSecretDialog } from '@/components/dialogs/Secret';

export default function AddOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Plus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuItem asChild>
          <AddGroupSecretDialog />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AddSecretDialog />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
