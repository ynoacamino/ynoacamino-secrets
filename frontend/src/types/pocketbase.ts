import { RecordModel } from 'pocketbase';

export enum Collections {
  USER = 'users',
  SECRET = 'secrets',
  GROUP_SECRET = 'group_secrets',
}

export enum UserFields {
  ID = 'id',
  USERNAME = 'username',
  SECRET_TOKEN = 'secret_token',
  EMAIL = 'email',

  CREATED = 'created',
  UPDATED = 'updated',
}

export enum SecretFields {
  ID = 'id',
  NAME = 'name',
  VALUE = 'value',
  GROUP_SECRET = 'group_secret',

  CREATED = 'created',
  UPDATED = 'updated',

  EXPAND = 'expand',
}

export enum GroupSecretFields {
  ID = 'id',
  NAME = 'name',
  USER = 'user',

  CREATED = 'created',
  UPDATED = 'updated',

  EXPAND = 'expand',
}

export interface User extends RecordModel {
  [UserFields.ID]: string;
  [UserFields.USERNAME]: string;
  [UserFields.EMAIL]: string;
  [UserFields.SECRET_TOKEN]?: string;

  [UserFields.CREATED]: string;
  [UserFields.UPDATED]: string;
}

export interface Secret extends RecordModel {
  [SecretFields.ID]: string;
  [SecretFields.NAME]: string;
  [SecretFields.VALUE]: string;

  [SecretFields.CREATED]: string;
  [SecretFields.UPDATED]: string;

  [SecretFields.EXPAND]?: {
    [SecretFields.GROUP_SECRET]: GroupSecret;
  }
}

export interface GroupSecret extends RecordModel {
  [GroupSecretFields.ID]: string;
  [GroupSecretFields.NAME]: string;
  [GroupSecretFields.USER]: string;

  [GroupSecretFields.EXPAND]?: {
    secrets_via_group_secret: Secret[];
  }

  [GroupSecretFields.CREATED]: string;
  [GroupSecretFields.UPDATED]: string;
}
