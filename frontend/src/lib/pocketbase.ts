import { BACKEND_URL, POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } from '@/config/global';
import {
  Collections, GroupSecret, GroupSecretFields, Secret, SecretFields, User, UserFields,
} from '@/types/pocketbase';
import { log } from 'node:console';
import PocketBase from 'pocketbase';

let client: PocketBase | null = null;

export function joinExpand(expand: Collections[] | string[]) {
  return expand.join(',');
}

export const pb = {
  connect: async () => {
    if (!client) {
      client = new PocketBase(BACKEND_URL);
      await client.collection('_superusers').authWithPassword(
        POCKETBASE_ADMIN_EMAIL,
        POCKETBASE_ADMIN_PASSWORD,
      );
    }
    return client;
  },
  getUser: async ({ secretToken }:{ secretToken: string }) => {
    const pbClient = await pb.connect();
    try {
      const user = await pbClient.collection(Collections.USER).getFirstListItem(
        `${UserFields.SECRET_TOKEN}="${secretToken}"`,
      ) as User;
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
        .collection(Collections.GROUP_SECRET)
        .getFullList({
          filter: `${GroupSecretFields.USER}.${UserFields.USERNAME} = "${username}"`,
          expand: joinExpand([
            `${Collections.SECRET}_via_${Collections.GROUP_SECRET}`,
            Collections.USER,
          ]),
          sort: `${GroupSecretFields.NAME}`,
        });

      return groupSecrets as GroupSecret[];
    } catch (e) {
      log(e);
      return [];
    }
  },
  createGroupSecret: async ({ name, userId }:{ name: string, userId: string }) => {
    const pbClient = await pb.connect();
    try {
      const groupSecret = await pbClient.collection(Collections.GROUP_SECRET).create({
        [GroupSecretFields.NAME]: name,
        [GroupSecretFields.USER]: userId,
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
    {
      secretId, name, value, groupSecretId,
    }:{ secretId: string, name: string, value: string, groupSecretId: string },
  ) => {
    const pbClient = await pb.connect();
    try {
      const secret = await pbClient.collection(Collections.SECRET).update(secretId, {
        [SecretFields.NAME]: name,
        [SecretFields.VALUE]: value,
        [SecretFields.GROUP_SECRET]: groupSecretId,
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
