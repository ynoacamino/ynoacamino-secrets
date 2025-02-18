'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { BACKEND_URL } from '@/config/global';
import {
  CreateGroupSecretParams,
  CreateSecretParams,
  DeleteGroupSecretParams,
  DeleteSecretParams,
  LoginParams,
  UpdateGroupSecretParams,
  UpdateSecretParams,
} from '@/types/pbContext';
import {
  Collections, GroupSecret, GroupSecretFields, Secret, SecretFields, User, UserFields,
} from '@/types/pocketbase';
import PocketBase from 'pocketbase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

import { joinExpand } from '@/lib/utils';

const userContext = createContext<{
  login:(params: LoginParams) => Promise<void>,
  logout:() => void,
  getGroupSecrets:() => Promise<GroupSecret[]>,
  createSecret:(params: CreateSecretParams) => Promise<Secret | null>,
  updateSecret:(params: UpdateSecretParams) => Promise<Secret | null>,
  createGroupSecret:(params: CreateGroupSecretParams) => Promise<GroupSecret | null>,
  updateGroupSecret:(params: UpdateGroupSecretParams) => Promise<GroupSecret | null>,
  deleteSecret:(params: DeleteSecretParams) => Promise<boolean>,
  deleteGroupSecret:(params: DeleteGroupSecretParams) => Promise<boolean>,
  getUser: () => User,
  isLoadingInit: boolean,
} | null>(null);

export const usePb = () => {
  const context = useContext(userContext);
  if (!context) throw new Error('Context not found');
  return context;
};

export function PbProvider({ children }: { children: React.ReactNode }) {
  const [pb] = useState(new PocketBase(BACKEND_URL));
  const [isLoadingInit, setIsLoadingInit] = useState(true);

  const { toast } = useToast();
  const router = useRouter();

  const getUser = () => pb.authStore.record as User;

  useEffect(() => {
    const { isValid } = pb.authStore;

    if (!isValid || !pb.authStore.record) {
      router.push('/login');
    } else {
      setIsLoadingInit(false);
    }
  }, [pb.authStore.isValid]);

  const login = async ({ username, password }: LoginParams) => {
    try {
      const user = await pb.collection(Collections.USER).authWithPassword(username, password);

      if (user) {
        toast({
          title: 'Bienvenido!',
          description: 'Iniciaste sesion correctamente',
        });

        router.push('/');
      }
    } catch (error) {
      toast({
        title: 'Error al iniciar sesion',
        description: 'Verifica tus credenciales',
        variant: 'destructive',
      });
    }
  };

  const logout = async () => {
    pb.authStore.clear();
  };

  const getGroupSecrets = async () => {
    try {
      const groupSecrets = await pb
        .collection(Collections.GROUP_SECRET)
        .getFullList({
          filter: `${GroupSecretFields.USER}.${UserFields.USERNAME} = "${getUser()[UserFields.USERNAME]}"`,
          expand: joinExpand([
            `${Collections.SECRET}_via_${SecretFields.GROUP_SECRET}`,
            GroupSecretFields.USER,
          ]),
          sort: `${GroupSecretFields.NAME}`,
        });

      return groupSecrets as GroupSecret[];
    } catch (e) {
      toast({
        title: 'Error al obtener los secretos',
        description: 'Intentalo luego',
        variant: 'destructive',
      });
      return [];
    }
  };

  const createGroupSecret = async ({ name }: CreateGroupSecretParams) => {
    try {
      const groupSecret = await pb.collection(Collections.GROUP_SECRET).create({
        [GroupSecretFields.NAME]: name,
        [GroupSecretFields.USER]: getUser()[UserFields.ID],
      });
      return groupSecret as GroupSecret;
    } catch (e) {
      toast({
        title: 'Error al crear el grupo de secretos',
        description: 'Intentalo luego',
        variant: 'destructive',
      });
      return null;
    }
  };

  const createSecret = async (
    { name, value, groupSecretId }:CreateSecretParams,
  ) => {
    try {
      const secret = await pb.collection(Collections.SECRET).create({
        [SecretFields.NAME]: name,
        [SecretFields.VALUE]: value,
        [SecretFields.GROUP_SECRET]: groupSecretId,
      }) as Secret;
      return secret;
    } catch (_) {
      toast({
        title: 'Error al crear el secreto',
        description: 'Intentalo luego',
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateGroupSecret = async (
    { groupSecretId, name }: UpdateGroupSecretParams,
  ) => {
    try {
      const groupSecret = await pb
        .collection(Collections.GROUP_SECRET)
        .update(groupSecretId, {
          [GroupSecretFields.NAME]: name,
        }) as GroupSecret;
      return groupSecret;
    } catch (e) {
      toast({
        title: 'Error al editar el grupo de secretos',
        description: 'Intentalo luego',
        variant: 'destructive',
      });
      return null;
    }
  };
  const updateSecret = async (
    {
      secretId, name, value, groupSecretId,
    }: UpdateSecretParams,
  ) => {
    try {
      const secret = await pb.collection(Collections.SECRET).update(secretId, {
        [SecretFields.NAME]: name,
        [SecretFields.VALUE]: value,
        [SecretFields.GROUP_SECRET]: groupSecretId,
      }) as Secret;
      return secret;
    } catch (e) {
      toast({
        title: 'Error al editar el secreto',
        description: 'Intentalo luego',
        variant: 'destructive',
      });
      return null;
    }
  };
  const deleteSecret = async ({ secretId }: DeleteSecretParams) => {
    try {
      await pb.collection(Collections.SECRET).delete(secretId);
      return true;
    } catch (e) {
      toast({
        title: 'Error al eliminar el secreto',
        description: 'Intentalo luego',
        variant: 'destructive',
      });
      return false;
    }
  };
  const deleteGroupSecret = async ({ groupSecretId }: DeleteGroupSecretParams) => {
    try {
      await pb.collection(Collections.GROUP_SECRET).delete(groupSecretId);
      return true;
    } catch (e) {
      toast({
        title: 'Error al elmimar el grupo de secretos',
        description: 'Intentalo luego',
        variant: 'destructive',
      });
      return false;
    }
  };

  const contextValue = useMemo(() => ({
    login,
    logout,
    getGroupSecrets,
    createGroupSecret,
    createSecret,
    updateGroupSecret,
    updateSecret,
    deleteSecret,
    deleteGroupSecret,
    getUser,
    isLoadingInit,
  }), [isLoadingInit]);

  return (
    <userContext.Provider
      value={contextValue}
    >
      {children}
    </userContext.Provider>
  );
}
