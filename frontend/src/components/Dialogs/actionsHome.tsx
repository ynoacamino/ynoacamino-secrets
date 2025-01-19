'use server';

import { pb } from '@/lib/pocketbase';
import { revalidatePath } from 'next/cache';

export const addSecretAction = async (formData: FormData) => {
  const secretData = {
    name: formData.get('name') as string,
    value: formData.get('value') as string,
    groupSecretId: formData.get('groupSecretId') as string,
  };

  await pb.createSecret({
    groupSecretId: secretData.groupSecretId,
    name: secretData.name,
    value: secretData.value,
  });

  revalidatePath('/');
};

export const deleteSecretAction = async (formData: FormData) => {
  const secretId = formData.get('secretId') as string;

  await pb.deleteSecret({ secretId });

  revalidatePath('/');
};

export const updateSecretAction = async (formData: FormData) => {
  const secretData = {
    name: formData.get('name') as string,
    value: formData.get('value') as string,
    secretId: formData.get('secretId') as string,
    groupSecretId: formData.get('groupSecretId') as string,
  };

  await pb.updateSecret({
    secretId: secretData.secretId,
    name: secretData.name,
    value: secretData.value,
    groupSecretId: secretData.groupSecretId,
  });

  revalidatePath('/');
};

export const addGroupSecretAction = async (formData: FormData) => {
  const groupSecretData = {
    name: formData.get('name') as string,
    userId: formData.get('userId') as string,
  };

  await pb.createGroupSecret({
    name: groupSecretData.name,
    userId: groupSecretData.userId,
  });

  revalidatePath('/');
};

export const deleteGroupSecretAction = async (formData: FormData) => {
  const groupSecretId = formData.get('groupSecretId') as string;

  await pb.deleteGroupSecret({ groupSecretId });

  revalidatePath('/');
};

export const updateGroupSecretAction = async (formData: FormData) => {
  const groupSecretData = {
    name: formData.get('name') as string,
    groupSecretId: formData.get('groupSecretId') as string,
  };

  await pb.updateGroupSecret({
    groupSecretId: groupSecretData.groupSecretId,
    name: groupSecretData.name,
  });

  revalidatePath('/');
};
