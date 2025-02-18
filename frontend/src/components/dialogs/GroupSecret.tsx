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
  GroupSecret, GroupSecretFields,
} from '@/types/pocketbase';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  AddGroupSecret,
  addGroupSecretSchema,
  DeleteGroupSecret,
  deleteGroupSecretSchema,
  EditGroupSecret,
  editGroupSecretSchema,
} from '@/types/mutations';
import { useGroupSecrets } from '@/lib/swr';
import { usePb } from '../providers/PbProvider';
import {
  Form, FormControl, FormField, FormItem, FormMessage,
} from '../ui/form';

export function AddGroupSecretDialog() {
  const [open, setOpen] = useState(false);
  const { createGroupSecret } = usePb();
  const { mutate } = useGroupSecrets();

  const form = useForm<AddGroupSecret>({
    resolver: zodResolver(addGroupSecretSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: AddGroupSecret) => {
    createGroupSecret(values)
      .finally(() => {
        mutate();
        setOpen(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-5 items-center gap-4 py-6">
                    <Label htmlFor="name" className="text-right">Nombre</Label>
                    <FormControl className="col-span-4">
                      <div>
                        <Input
                          {...field}
                          placeholder="Cloudflare"
                        />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function EditGroupSecretDialog(
  { groupSecret }: { groupSecret: GroupSecret },
) {
  const [open, setOpen] = useState(false);

  const { updateGroupSecret } = usePb();
  const { mutate } = useGroupSecrets();

  const form = useForm<EditGroupSecret>({
    resolver: zodResolver(editGroupSecretSchema),
    defaultValues: {
      name: groupSecret[GroupSecretFields.NAME],
      groupSecretId: groupSecret[GroupSecretFields.ID],
    },
  });

  const onSubmit = async (values: EditGroupSecret) => {
    updateGroupSecret(values)
      .finally(() => {
        mutate();
        setOpen(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-5 items-center gap-4 py-6">
                    <Label htmlFor="name" className="text-right">Nombre</Label>
                    <FormControl className="col-span-4">
                      <div>
                        <Input
                          {...field}
                          placeholder="Cloudflare"
                        />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="groupSecretId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="hidden"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteGroupSecretDialog(
  { groupSecret }: { groupSecret: GroupSecret },
) {
  const [open, setOpen] = useState(false);

  const { mutate } = useGroupSecrets();

  const form = useForm<DeleteGroupSecret>({
    resolver: zodResolver(deleteGroupSecretSchema),
    defaultValues: {
      groupSecretId: groupSecret[GroupSecretFields.ID],
    },
  });

  const { deleteGroupSecret } = usePb();

  const onSubmit = async (values: DeleteGroupSecret) => {
    deleteGroupSecret(values)
      .finally(() => {
        mutate();
        setOpen(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="groupSecretId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="hidden"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" variant="destructive">Eliminar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
