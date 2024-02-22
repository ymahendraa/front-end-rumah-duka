import { getSession } from "next-auth/react";

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
 *
 * @description
 * fetcher: custom fetcher to handle fetch data
 * @param url : string of url
 * @param options : options of fetcher
 * @returns data from fetcher or error
 */
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Change to your specific environment variable
export const fetcher: Fetcher = async (
  path?: string,
  options?: FetcherOptions | undefined
) => {
  if (!baseUrl) {
    throw new Error("Base URL is not set");
  }

  if (!path) {
    throw new Error("Path is required");
  }

  const url = `${baseUrl}/${path}`;

  if (!url) {
    throw new Error("URL is required");
  }

  // Get the session
  const session = await getSession();

  // // If the session is not defined, throw an error
  if (!session) {
    throw new Error("Not authenticated");
  }

  try {
    const res = await fetch(url, options);
    if (res.ok) {
      return res.json(); // Parse JSON from the response
    } else {
      // If the response status is not ok, handle error here
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }
  } catch (error: any) {
    console.error(error); // Log any fetch errors
    throw error; // Rethrow the error for the calling code to handle
  }
};
