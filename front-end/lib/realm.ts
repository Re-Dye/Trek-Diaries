import * as Realm from "realm-web"

const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID as string
if (!REALM_APP_ID) {
    throw new Error(`'Invalid/Missing environment variable: "NEXT_PUBLIC_REALM_APP_ID"`)
}

const app = new Realm.App({ id: REALM_APP_ID });
const credentials = Realm.Credentials.anonymous();

async function RealmConnect() {
    try {
      const user = await app.logIn(credentials);
      return user
    } catch(err) {
      throw new Error("Failed to log in", err as any);
    }
}

export default RealmConnect
