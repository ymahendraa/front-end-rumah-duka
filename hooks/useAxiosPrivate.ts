// hooks import
import { useEffect } from "react";
import { useSession } from "next-auth/react";

// utils import
import { axiosPrivate } from "@/lib/axios";
import { refreshAccessToken } from "@/lib/refreshAccessToken";

/**
 * @todo fix the refresh token schema
 * @returns t
 */
const useAxiosPrivate = () => {
  const { data: session, update } = useSession();

  let refreshTokenPromise: Promise<any> | null;

  useEffect(() => {
    if (!session) {
      return;
    }
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          console.log("this line of code is run");
          config.headers[
            "Authorization"
          ] = `Bearer ${session?.user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error.config && error.response && error.response.status == 401) {
          if (!refreshTokenPromise) {
            refreshTokenPromise = refreshAccessToken(
              session?.user.refreshToken ?? ""
            ).then((token) => {
              refreshTokenPromise = null;
              return token;
            });
          }

          return refreshTokenPromise.then(async (token) => {
            if (!token) {
              return;
            }
            prevRequest.headers[
              "Authorization"
            ] = `Bearer ${token?.accessToken}`;
            // update the token in the session
            await update({
              ...session,
              user: {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
              },
            });
            return axiosPrivate(prevRequest);
          });
        }
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshAccessToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
