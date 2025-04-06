import { z } from 'zod';

export const addGroupSecretSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'El nombre del grupo debe tener al menos 3 caracteres.',
    })
    .max(30, {
      message: 'El nombre del grupo no puede tener más de 30 caracteres.',
    }),
});

export type AddGroupSecret = z.infer<typeof addGroupSecretSchema>;

// -----------------------------------------------------------------------

export const editGroupSecretSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'El nombre del grupo debe tener al menos 3 caracteres.',
    })
    .max(30, {
      message: 'El nombre del grupo no puede tener más de 30 caracteres.',
    }),
  groupSecretId: z.string(),
});

export type EditGroupSecret = z.infer<typeof editGroupSecretSchema>;

// -----------------------------------------------------------------------

export const deleteGroupSecretSchema = z.object({
  groupSecretId: z.string(),
});

export type DeleteGroupSecret = z.infer<typeof deleteGroupSecretSchema>;

// -----------------------------------------------------------------------

export const addSecretSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'El nombre del secreto debe tener al menos 3 caracteres.',
    })
    .max(30, {
      message: 'El nombre del secreto no puede tener más de 30 caracteres.',
    }),
  value: z
    .string()
    .min(1, {
      message: 'El valor del secreto debe tener al menos 1 caracter.',
    })
    .max(300, {
      message: 'El valor del secreto no puede tener más de 300 caracteres.',
    }),
  groupSecretId: z.string().min(1, {
    message: 'El nombre del grupo no puede estar vacío.',
  }),
});

export type AddSecret = z.infer<typeof addSecretSchema>;

// -----------------------------------------------------------------------

export const editSecretSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'El nombre del secreto debe tener al menos 3 caracteres.',
    })
    .max(30, {
      message: 'El nombre del secreto no puede tener más de 30 caracteres.',
    }),
  value: z
    .string()
    .min(1, {
      message: 'El valor del secreto debe tener al menos 1 caracter.',
    })
    .max(30, {
      message: 'El valor del secreto no puede tener más de 30 caracteres.',
    }),
  secretId: z.string(),
  groupSecretId: z.string(),
});

export type EditSecret = z.infer<typeof editSecretSchema>;

// -----------------------------------------------------------------------

export const deleteSecretSchema = z.object({
  secretId: z.string(),
});

export type DeleteSecret = z.infer<typeof deleteSecretSchema>;
