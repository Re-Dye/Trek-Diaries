export const getAuthSecret = (): string => {
  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("The environment variable NEXTAUTH_SECRET is not set.");
  }

  return secret;
};

export const getDbUrl = (): string => {
  const secret = process.env.DB_URL;

  if (!secret || secret.length === 0) {
    throw new Error("The environment variable DB_URL is not set.");
  }

  return secret;
};

export const getUpstashUrl = (): string => {
  const secret = process.env.UPSTASH_URL;

  if (!secret || secret.length === 0) {
    throw new Error("The environment variable UPSTASH_URL is not set.");
  }

  return secret;
};

export const getUpstashToken = (): string => {
  const secret = process.env.UPSTASH_TOKEN;

  if (!secret || secret.length === 0) {
    throw new Error("The environment variable UPSTASH_TOKEN is not set.");
  }

  return secret;
};

export const getBaseUrl = (): string => {
  const secret = process.env.NEXT_PUBLIC_BASE_URL;

  if (!secret || secret.length === 0) {
    throw new Error("The environment variable BASE_URL is not set.");
  }

  return secret;
};

export const getAlgoliaAppId = (): string => {
  const secret = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;

  if (!secret || secret.length === 0) {
    throw new Error(
      "The environment variable NEXT_PUBLIC_ALGOLIA_APP_ID is not set."
    );
  }

  return secret;
};

export const getAlgoliaAdminKey = (): string => {
  const secret = process.env.ALGOLIA_ADMIN_API_KEY;

  if (!secret || secret.length === 0) {
    throw new Error(
      "The environment variable ALGOLIA_ADMIN_API_KEY is not set."
    );
  }

  return secret;
};

export const getAlgoliaApiKey = (): string => {
  const secret = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;

  if (!secret || secret.length === 0) {
    throw new Error(
      "The environment variable NEXT_PUBLIC_ALGOLIA_API_KEY is not set."
    );
  }

  return secret;
};

export const getAlgoliaIndexName = (): string => {
  const secret = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;

  if (!secret || secret.length === 0) {
    throw new Error(
      "The environment variable NEXT_PUBLIC_ALGOLIA_INDEX_NAME is not set."
    );
  }

  return secret;
};

export const getCloudinaryName = (): string => {
  const secret = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!secret || secret.length === 0) {
    throw new Error(
      "The environment variable NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set."
    );
  }

  return secret;
};

export const getCloudinaryApiKey = (): string => {
  const secret = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

  if (!secret || secret.length === 0) {
    throw new Error(
      "The environment variable NEXT_PUBLIC_CLOUDINARY_API_KEY is not set."
    );
  }

  return secret;
};

export const getCloudinaryApiSecret = (): string => {
  const secret = process.env.CLOUDINARY_API_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error(
      "The environment variable CLOUDINARY_API_SECRET is not set."
    );
  }

  return secret;
};

export const getCloudinaryFolderName = (): string => {
  const secret = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME;

  if (!secret || secret.length === 0) {
    throw new Error(
      "The environment variable NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME is not set."
    );
  }

  return secret;
};