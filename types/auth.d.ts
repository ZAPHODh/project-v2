declare module "next-auth" {
  interface User {
    subscriptionRole: string | null;
  }

  interface Token {
    subscriptionRole: string | null;
  }
  interface Session {
    subscriptionRole: string | null;
  }
}
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    subscriptionRole: string | null;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    subscriptionRole: string | null;
  }
}
