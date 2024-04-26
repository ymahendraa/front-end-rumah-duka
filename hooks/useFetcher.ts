import useAxiosPrivate from "./useAxiosPrivate";
import { TODO } from "@/types/todo";

// define fetcher options type
type FetcherOptions = {
  method?: string;
  headers?: any;
  body?: any;
};

// create fetcher
type Fetcher = (
  path?: string | undefined,
  options?: FetcherOptions | undefined
) => Promise<any>; // type of fetcher

/**
 * @description
 * useFetcher: custom hook to fetch data
 * @returns fetcher function
 */
const useFetcher = (session: TODO) => {
  // define axiosPrivate instance
  const axiosPrivate = useAxiosPrivate();
  /**
   * @description
   * fetcher: function to fetch data
   * @param path url path to fetch data
   * @param options fetcher options (method, headers, body)
   * @returns data fetched
   */
  const fetcher: Fetcher = async (
    path?: string,
    options?: FetcherOptions | undefined
  ) => {
    try {
      const res = await axiosPrivate({
        url: path,
        method: options?.method || "GET",
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        ...((options?.method == "POST" || options?.method == "PATCH") && {
          data: options?.body,
        }),
      });

      // if (res?.status == 204) {
      //   return res;
      // }
      console.log("res", res);
      // Check if res exists and if the status is in the range 200-299
      if (res && res.status >= 200 && res.status < 300) {
        return res.data; // Parse JSON from the response
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      console.error("Error data:", error);
      // Check if error.response exists before accessing its properties
      if (error.response) {
        throw new Error(
          error.response.data.error || error.message || error.error
        );
      } else {
        throw error;
      }
    }
  };

  return fetcher;
};

export default useFetcher;
