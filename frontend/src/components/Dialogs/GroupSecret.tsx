'use client';

import {
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  GroupSecret, GroupSecretFields, User, UserFields,
} from '@/types/pocketbase';
import { addGroupSecretAction, deleteGroupSecretAction, updateGroupSecretAction } from './actionsHome';

export function AddGroupSecretDialog(
  { user }: { user: User },
) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Plus />
          Agregar grupo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar grupo</DialogTitle>
          <DialogDescription>
            Agrega un nuevo grupo para ordenar tus secretos
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" action={addGroupSecretAction}>
          <div className="grid grid-cols-5 items-center gap-4 py-6">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              placeholder="Cloudflare"
              className="col-span-4"
              name="name"
            />
          </div>
          <input type="hidden" name="userId" value={user[UserFields.ID]} />
          <DialogFooter>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function EditGroupSecretDialog(
  { groupSecret }: { groupSecret: GroupSecret },
) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Pencil />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar grupo</DialogTitle>
          <DialogDescription>
            Edita el nombre del grupo
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" action={updateGroupSecretAction}>
          <div className="grid grid-cols-5 items-center gap-4 py-6">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              placeholder="Cloudflare"
              className="col-span-4"
              name="name"
              defaultValue={groupSecret[GroupSecretFields.NAME]}
            />
          </div>
          <input type="hidden" name="groupSecretId" value={groupSecret[GroupSecretFields.ID]} />
          <DialogFooter>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteGroupSecretDialog(
  { groupSecret }: { groupSecret: GroupSecret },
) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Trash2 />
          Eliminar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Eliminar grupo</DialogTitle>
          <DialogDescription>
            Elimina el grupo y todos sus secretos
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" action={deleteGroupSecretAction}>
          <input type="hidden" name="groupSecretId" value={groupSecret[GroupSecretFields.ID]} />
          <DialogFooter>
            <Button type="submit" variant="destructive">Eliminar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
