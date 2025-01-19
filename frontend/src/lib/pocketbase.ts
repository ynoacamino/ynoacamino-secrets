import { BACKEND_URL } from '@/config/global';
import {
  Collections, GroupSecret, GroupSecretFields, Secret, SecretFields, User, UserFields,
} from '@/types/pocketbase';
import { log } from 'node:console';
import PocketBase from 'pocketbase';
// import {  } from '@/types/pocketbase';

let client: PocketBase | null = null;

export function joinExpand(expand: Collections[] | string[]) {
  return expand.join(',');
}

export const pb = {
  connect: async () => {
    if (!client) {
      client = new PocketBase(BACKEND_URL);
    }
    return client;
  },
  getUser: async ({ username }:{ username: string }) => {
    const pbClient = await pb.connect();
    try {
      const user = await pbClient.collection(Collections.USER).getOne(username) as User;
      return user;
    } catch (e) {
      log(e);
      return null;
    }
  },
  getGroupSecrets: async ({ username }:{ username: string }) => {
    const pbClient = await pb.connect();
    try {
      const groupSecrets = await pbClient
        .collection('awdaw')
        .getFullList({
          filter: `${GroupSecretFields.USER}.${UserFields.USERNAME} = "${username}"`,
          expand: joinExpand([
            `${Collections.SECRET}_v_${Collections.GROUP_SECRET}`,
            Collections.USER,
          ]),
        });

      return groupSecrets as GroupSecret[];
    } catch (e) {
      log(e);
      return [];
    }
  },
  createGroupSecret: async ({ name, username }:{ name: string, username: string }) => {
    const pbClient = await pb.connect();
    try {
      const groupSecret = await pbClient.collection(Collections.GROUP_SECRET).create({
        [GroupSecretFields.NAME]: name,
        [GroupSecretFields.USER]: username,
      });
      return groupSecret as GroupSecret;
    } catch (e) {
      log(e);
      return null;
    }
  },
  createSecret: async (
    { name, value, groupSecretId }:{ name: string, value: string, groupSecretId: string },
  ) => {
    const pbClient = await pb.connect();
    try {
      const secret = await pbClient.collection(Collections.SECRET).create({
        [SecretFields.NAME]: name,
        [SecretFields.VALUE]: value,
        [SecretFields.GROUP_SECRET]: groupSecretId,
      }) as Secret;
      return secret;
    } catch (_) {
      return null;
    }
  },
  updateGroupSecret: async (
    { groupSecretId, name }:{ groupSecretId: string, name: string },
  ) => {
    const pbClient = await pb.connect();
    try {
      const groupSecret = await pbClient
        .collection(Collections.GROUP_SECRET)
        .update(groupSecretId, {
          [GroupSecretFields.NAME]: name,
        }) as GroupSecret;
      return groupSecret;
    } catch (e) {
      log(e);
      return null;
    }
  },
  updateSecret: async (
    { secretId, name, value }:{ secretId: string, name: string, value: string },
  ) => {
    const pbClient = await pb.connect();
    try {
      const secret = await pbClient.collection(Collections.SECRET).update(secretId, {
        [SecretFields.NAME]: name,
        [SecretFields.VALUE]: value,
      }) as Secret;
      return secret;
    } catch (e) {
      log(e);
      return null;
    }
  },
  deleteSecret: async ({ secretId }:{ secretId: string }) => {
    const pbClient = await pb.connect();
    try {
      await pbClient.collection(Collections.SECRET).delete(secretId);
      return true;
    } catch (e) {
      log(e);
      return false;
    }
  },
  deleteGroupSecret: async ({ groupSecretId }:{ groupSecretId: string }) => {
    const pbClient = await pb.connect();
    try {
      await pbClient.collection(Collections.GROUP_SECRET).delete(groupSecretId);
      return true;
    } catch (e) {
      log(e);
      return false;
    }
  },
};
