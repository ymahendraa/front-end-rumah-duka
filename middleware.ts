import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { MenuType } from "./utils/menu-array";

export default withAuth(
  /**
   * @description middleware to check if user is authorized to access the page
   * @param req request
   * @param res response
   * @returns response
   */
  async function middleware(req, res) {
    // get token
    const token = req.nextauth.token;
    // get list authorized menu
    const menu = (token as any)?.authorization.menu;

    // get authorization data
    const path = req?.nextUrl?.pathname;

    /**
     * @description checkPath function to check if path is authorized
     * @param menu menu
     * @returns boolean
     */
    const checkPath = (menu: MenuType) => {
      if (menu.path === path) {
        return true;
      }
      if (menu.children) {
        return menu.children.some(checkPath);
      }
      return false;
    };

    const isAuthorized = menu.some(checkPath);

    // if not authorized then redirect to unauthorized page
    if (!isAuthorized) {
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
      // remove /api from BASE_URL
      const url = BASE_URL?.replace("/api", "");
      return NextResponse.redirect(`${url}/unauthorized`);
    }
  },
  {
    /**
     * @description callback to check if user is authorized
     * @param params params
     * @returns boolean
     */
    callbacks: {
      authorized: (params) => {
        const { token } = params;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/master/:path*",
    "/transaction/:path*",
    "/home/:path*",
    "/report/:path*",
    "/authorization-management/:path*",
  ],
};
