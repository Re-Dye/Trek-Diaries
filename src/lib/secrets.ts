export const getAuthSecret = (): string => {
    const secret = process.env.NEXTAUTH_SECRET

    if (!secret || secret.length === 0) {
        throw new Error("The environment variable NEXTAUTH_SECRET is not set.")
    }

    return secret
}

export const getDbUrl = (): string => {
    const secret = process.env.DB_URL

    if (!secret || secret.length === 0) {
        throw new Error("The environment variable DB_URL is not set.")
    }

    return secret
}

export const getUpstashUrl = (): string => {
    const secret = process.env.UPSTASH_URL

    if (!secret || secret.length === 0) {
        throw new Error("The environment variable UPSTASH_URL is not set.")
    }

    return secret
}

export const getUpstashToken = (): string => {
    const secret = process.env.UPSTASH_TOKEN

    if (!secret || secret.length === 0) {
        throw new Error("The environment variable UPSTASH_TOKEN is not set.")
    }

    return secret
}

export const getBaseUrl = (): string => {
    const secret = process.env.NEXT_PUBLIC_BASE_URL

    if (!secret || secret.length === 0) {
        throw new Error("The environment variable BASE_URL is not set.")
    }

    return secret
}

export const getTriggerUrl = (): string => {
    const secret = process.env.CENSUS_TRIGGER_URL;

    if (!secret || secret.length === 0) {
        throw new Error("The environment variable CENSUS_TRIGGER_URL is not set.")
    }

    return secret
}

export const getTriggerToken = (): string => {
    const secret = process.env.CENSUS_TRIGGER_SECRET_TOKEN;

    if (!secret || secret.length === 0) {
        throw new Error("The environment variable CENSUS_TRIGGER_SECRET_TOKEN is not set.")
    }

    return secret
}