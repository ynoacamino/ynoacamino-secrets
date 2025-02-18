'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl, FormField, FormItem, FormMessage, Form,
} from '@/components/ui/form';
import { usePb } from '@/components/providers/PbProvider';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'El correo electrónico debe tener al menos 5 caracteres.',
    })
    .max(30, {
      message: 'El correo electrónico no puede tener más de 50 caracteres.',
    }),
  password: z
    .string()
    .min(5, {
      message: 'La contraseña debe tener al menos 5 caracteres.',
    })
    .max(30, {
      message: 'La contraseña no puede tener más de 30 caracteres.',
    })
  ,
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { login, isLoadingInit, getUser } = usePb();

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await login(values);
  };

  useEffect(() => {
    if (!isLoadingInit && getUser()) {
      router.push('/');
    }
  }, [isLoadingInit]);

  return (
    <main>
      <Dialog open>
        <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Inicia sesión</DialogTitle>
            <DialogDescription>
              Ingresa tus datos para iniciar sesión
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="username">Usuario</Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Usuario"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password">Contraseña</Label>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Contraseña"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-6">
                Iniciar sesión
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
