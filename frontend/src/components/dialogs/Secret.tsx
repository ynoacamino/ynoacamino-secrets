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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  AddSecret, addSecretSchema, DeleteSecret, deleteSecretSchema, EditSecret,
  editSecretSchema,
} from '@/types/mutations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGroupSecrets } from '@/lib/swr';
import { usePb } from '../providers/PbProvider';
import {
  Form, FormControl, FormField, FormItem,
  FormMessage,
} from '../ui/form';

export function AddSecretDialog({
  defaultGroupSecretId = '',
}: {
  defaultGroupSecretId?: string;
}) {
  const [open, setOpen] = useState(false);
  const { groupSecrets, isLoading, mutate } = useGroupSecrets();

  const { createSecret } = usePb();

  const form = useForm<AddSecret>({
    resolver: zodResolver(addSecretSchema),
    defaultValues: {
      name: '',
      value: '',
      groupSecretId: defaultGroupSecretId,
    },
  });

  const onSubmit = async (values: AddSecret) => {
    createSecret(values)
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
        <Form {...form}>
          <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-6">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-5 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nombre
                      </Label>
                      <FormControl className="col-span-4">
                        <div>
                          <Input
                            {...field}
                            placeholder="email"
                          />
                          <FormMessage />
                        </div>
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                name="value"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-5 items-center gap-4">
                      <Label htmlFor="value" className="text-right">
                        Valor
                      </Label>
                      <FormControl className="col-span-4">
                        <div>
                          <Input
                            {...field}
                            placeholder="c2qzdcRhClI34eYQR"
                          />
                          <FormMessage />
                        </div>
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                name="groupSecretId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-5 items-center gap-4">
                      <Label htmlFor="groupSecretId" className="text-right">
                        Grupo
                      </Label>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full col-span-4">
                            <SelectValue placeholder="Selecciona un grupo" />
                            <FormMessage />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {
                        isLoading || !groupSecrets ? <SelectItem value="Loading">Loading...</SelectItem>
                          : (groupSecrets.map(({ id, name }) => (
                            <SelectItem key={id} value={id}>
                              {name}
                            </SelectItem>
                          )))
                      }
                        </SelectContent>
                      </Select>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function EditSecretDialog(
  { secret }:
  { secret: Secret },
) {
  const [open, setOpen] = useState(false);

  const { updateSecret } = usePb();

  const { groupSecrets, isLoading, mutate } = useGroupSecrets();

  const form = useForm<EditSecret>({
    resolver: zodResolver(editSecretSchema),
    defaultValues: {
      name: secret[SecretFields.NAME],
      value: secret[SecretFields.VALUE],
      groupSecretId: secret[SecretFields.GROUP_SECRET],
      secretId: secret[SecretFields.ID],
    },
  });

  const onSubmit = async (values: EditSecret) => {
    updateSecret(values)
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
          <DialogTitle>Editar secreto</DialogTitle>
          <DialogDescription>
            Edita el secreto, su nombre, valor o grupo.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-6">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-5 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nombre
                      </Label>
                      <FormControl className="col-span-4">
                        <div>
                          <Input
                            {...field}
                            placeholder="email"
                          />
                          <FormMessage />
                        </div>
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                name="value"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-5 items-center gap-4">
                      <Label htmlFor="value" className="text-right">
                        Valor
                      </Label>
                      <FormControl className="col-span-4">
                        <div>
                          <Input
                            {...field}
                            placeholder="c2qzdcRhClI34eYQR"
                          />
                          <FormMessage />
                        </div>
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                name="groupSecretId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-5 items-center gap-4">
                      <Label htmlFor="groupSecretId" className="text-right">
                        Grupo
                      </Label>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full col-span-4">
                            <SelectValue placeholder="Selecciona un grupo" />
                            <FormMessage />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {
                        isLoading || !groupSecrets ? <SelectItem value="Loading">Loading...</SelectItem>
                          : (groupSecrets.map(({ id, name }) => (
                            <SelectItem key={id} value={id}>
                              {name}
                            </SelectItem>
                          )))
                      }
                        </SelectContent>
                      </Select>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secretId"
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
            </div>
            <DialogFooter>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteSecretDialog(
  { secret }: { secret: Secret },
) {
  const [open, setOpen] = useState(false);
  const { deleteSecret } = usePb();
  const { mutate } = useGroupSecrets();

  const form = useForm<DeleteSecret>({
    resolver: zodResolver(deleteSecretSchema),
    defaultValues: {
      secretId: secret[SecretFields.ID],
    },
  });

  const onSubmit = async (values: DeleteSecret) => {
    deleteSecret(values)
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
          <DialogTitle>Eliminar secreto</DialogTitle>
          <DialogDescription>
            Elimina el secreto de forma permanente.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="secretId"
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
