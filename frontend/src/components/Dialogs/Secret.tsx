'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import {
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react';
import { Secret, SecretFields } from '@/types/pocketbase';
import { addSecretAction, deleteSecretAction, updateSecretAction } from './actionsHome';

export function AddSecretDialog(
  { groupSecretsList }: { groupSecretsList: { id: string; name: string }[] },
) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Plus />
          Agregar secreto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar secreto</DialogTitle>
          <DialogDescription>
            Agrega un secreto para mantenerlo seguro y disponible en cualquier lugar.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col" action={addSecretAction}>
          <div className="grid gap-4 py-6">
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                placeholder="email"
                className="col-span-4"
                name="name"
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Valor
              </Label>
              <Input
                id="value"
                placeholder="c2qzdcRhClI34eYQR"
                className="col-span-4"
                name="value"
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Grupo
              </Label>
              <Select name="groupSecretId">
                <SelectTrigger className="w-full col-span-4">
                  <SelectValue placeholder="Selecciona un grupo" />
                </SelectTrigger>
                <SelectContent>
                  {
                  groupSecretsList.map(({ id, name }) => (
                    <SelectItem key={id} value={id}>
                      {name}
                    </SelectItem>
                  ))
                }
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function EditSecretDialog(
  { groupSecretsList, secret }:
  { groupSecretsList: { id: string; name: string }[], secret: Secret },
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
          <DialogTitle>Editar secreto</DialogTitle>
          <DialogDescription>
            Edita el secreto, su nombre, valor o grupo.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col" action={updateSecretAction}>
          <div className="grid gap-4 py-6">
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                placeholder="email"
                className="col-span-4"
                name="name"
                defaultValue={secret[SecretFields.NAME]}
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Valor
              </Label>
              <Input
                id="value"
                placeholder="c2qzdcRhClI34eYQR"
                className="col-span-4"
                name="value"
                defaultValue={secret[SecretFields.VALUE]}
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Grupo
              </Label>
              <Select name="groupSecretId" defaultValue={secret[SecretFields.GROUP_SECRET]}>
                <SelectTrigger className="w-full col-span-4">
                  <SelectValue placeholder="Selecciona un grupo" />
                </SelectTrigger>
                <SelectContent>
                  {
                  groupSecretsList.map(({ id, name }) => (
                    <SelectItem key={id} value={id}>
                      {name}
                    </SelectItem>
                  ))
                  }
                </SelectContent>
              </Select>
            </div>
            <input type="hidden" name="secretId" value={secret[SecretFields.ID]} />
          </div>
          <DialogFooter>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteSecretDialog(
  { secret }: { secret: Secret },
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
          <DialogTitle>Eliminar secreto</DialogTitle>
          <DialogDescription>
            Elimina el secreto de forma permanente.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" action={deleteSecretAction}>
          <input type="hidden" name="secretId" value={secret[SecretFields.ID]} />
          <DialogFooter>
            <Button type="submit" variant="destructive">Eliminar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
