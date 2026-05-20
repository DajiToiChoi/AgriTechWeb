import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "FARMER" | "CUSTOMER";
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: "ADMIN" | "FARMER" | "CUSTOMER";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "FARMER" | "CUSTOMER";
  }
}
