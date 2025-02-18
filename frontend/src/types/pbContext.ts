export type LoginParams = {
  username: string;
  password: string;
};

export type GetGroupSecretsParams = {

};

export type CreateGroupSecretParams = {
  name: string;
};

export type UpdateGroupSecretParams = {
  groupSecretId: string;
  name: string;
};

export type DeleteGroupSecretParams = {
  groupSecretId: string;
};

export type CreateSecretParams = {
  name: string;
  value: string;
  groupSecretId: string;
};

export type UpdateSecretParams = {
  secretId: string, name: string;
  value: string;
  groupSecretId: string;
};

export type DeleteSecretParams = {
  secretId: string;
};
