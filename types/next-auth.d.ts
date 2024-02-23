import NextAuth from "next-auth";
// import { TODO } from "./todo";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      accessToken: string;
      refreshToken: string;
      // authorization: TODO;
    };
  }
}
