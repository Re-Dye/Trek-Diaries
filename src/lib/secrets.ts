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