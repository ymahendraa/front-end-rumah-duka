import { signOut } from "next-auth/react";
import axios from "./axios";
/**
 * @todo execute signOut function when the refresh token is expired
 * @description refreshAccessToken: function to refresh access token
 * @param refreshToken string of refresh token
 * @returns new access token
 */
export async function refreshAccessToken(refreshToken: string) {
  try {
    // Send a request to the refresh token endpoint
    const res = await axios(`${process.env.NEXT_PUBLIC_REAL_URL}/refresh`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        "Content-Type": "application/json",
      },
    });
    // console.log("res", res);

    // Parse the response
    const data = await res.data.id;
    // console.log("data refresh", data);

    // If the response status is not ok, throw an error
    // if (![200, 201].includes(res.status)) {
    //   throw new Error(data.error);
    // }

    // Return the new access token
    return data;
  } catch (error: any) {
    console.error("Failed to refresh access token:", error);
    if (error.response.status === 401) {
      // delete the redis data with key id
      // axios.delete(`/redis/${id}`);

      console.log(error);
      // If the refresh token is expired, sign out
      // signOut();
      signOut({ callbackUrl: "/login" });

      return;
    }
    throw error;
  }
}
