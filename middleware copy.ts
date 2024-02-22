import { NextMiddleware, NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { encode, getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { withAuth } from "next-auth/middleware";

export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/master/:path*",
    "/transaction/:path*",
    "/home/:path*",
    "/report/:path*",
  ],
};

// const sessionCookie = process.env.NEXTAUTH_URL?.startsWith("https://")
//   ? "__Secure-next-auth.session-token"
//   : "next-auth.session-token";

// function signOut(request: NextRequest) {
//   const response = NextResponse.redirect(
//     new URL("/api/auth/signin", request.url)
//   );

//   request.cookies.getAll().forEach((cookie) => {
//     if (cookie.name.includes("next-auth.")) {
//       response.cookies.delete(cookie.name);
//     }
//   });

//   return response;
// }

// function shouldUpdateToken(
//   token: string,
//   expirationDate: number | null | undefined
// ) {
//   // This callback is called whenever a JWT token is created or updated
//   // If the token is expired, refresh it
//   console.log("token", token);
//   const expired = expirationDate && Date.now() > expirationDate * 1000;

//   return expired;
// }

// async function refreshAccessToken(refreshToken: string) {
//   try {
//     // Send a request to the refresh token endpoint
//     const res = await fetch(`http://localhost:3000/api/refresh`, {
//       method: "GET",
//       headers: {
//         Authorization: "Bearer " + refreshToken,
//       },
//     });

//     // Parse the response
//     const data = await res.json();

//     // If the response status is not ok, throw an error
//     if (!res.ok) {
//       throw new Error(data.error);
//     }

//     // Return the new access token
//     return data;
//   } catch (error) {
//     console.error("Failed to refresh access token:", error);
//     throw error;
//   }
// }

// export default withAuth(
//   async function middleware(request: NextRequest) {
//     console.log("Executing middleware");

//     const session = await getToken({ req: request });
//     // const session = await getSession();

//     if (!session) return signOut(request);

//     const accessToken = session.accessToken;

//     const expirationDate = accessToken
//       ? (jwt.decode(accessToken as string) as jwt.JwtPayload)?.exp
//       : null;

//     const response = NextResponse.next();

//     if (shouldUpdateToken(accessToken as string, expirationDate)) {
//       console.log("Access token has expired, refreshing token...");
//       const newAccess = await refreshAccessToken(
//         session.refreshToken as string
//       );
//       const newSessionToken = await encode({
//         secret: process.env.NEXTAUTH_SECRET as string,
//         token: {
//           ...session,
//           accessToken: newAccess.accessToken,
//           refreshToken: newAccess.refreshToken,
//         },
//         maxAge: expirationDate ? expirationDate * 1000 - Date.now() : undefined,
//       });

//       response.cookies.set(sessionCookie, newSessionToken);
//     }

//     return response;
//   },
//   {
//     callbacks: {
//       authorized: (params) => {
//         let { token } = params;
//         return !!token;
//       },
//     },
//   }
// );

// export const middleware: NextMiddleware = async (request: NextRequest) => {
//   console.log("Executing middleware");

//   const session = await getSession();

//   if (!session) return signOut(request);

//   const accessToken = session.user.accessToken;

//   const expirationDate = accessToken
//     ? (jwt.decode(accessToken) as jwt.JwtPayload)?.exp
//     : null;

//   const response = NextResponse.next();

//   if (shouldUpdateToken(accessToken, expirationDate)) {
//     console.log("Access token has expired, refreshing token...");
//     const newAccess = await refreshAccessToken(session.user.refreshToken);
//     const newSessionToken = await encode({
//       secret: process.env.NEXTAUTH_SECRET as string,
//       token: {
//         ...session,
//         accessToken: newAccess.accessToken,
//         refreshToken: newAccess.refreshToken,
//       },
//       maxAge: expirationDate ? expirationDate * 1000 - Date.now() : undefined,
//     });

//     response.cookies.set(sessionCookie, newSessionToken);
//   }
//   return response;
// };
