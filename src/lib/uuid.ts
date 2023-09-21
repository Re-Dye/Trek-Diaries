import { v4, v5 } from "uuid";

const namespace = v4();

export const generateUUID = (name: string) => v5(name, namespace);