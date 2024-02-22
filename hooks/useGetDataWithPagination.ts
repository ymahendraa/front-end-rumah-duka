import useSWR from "swr";
import useFetcher from "@/hooks/useFetcher";
import { useSession } from "next-auth/react";

type GetParamsProps = {
  page?: number;
  limit?: number;
  url?: string;
  filter?: string;
};

/**
 * @description
 * useGetDataWithPagination: custom hook to fetch data with pagination
 * @param page number of page
 * @param limit number of limit
 * @param url url to fetch data
 * @returns
 * data: data fetched
 * error: error when fetching data
 * isLoading: loading state
 * mutate: function to mutate data
 *
 * @example
 * const { data, error, isLoading, mutate } = useGetDataWithPagination({ page, limit, url });
 */
export function useGetDataWithPagination({
  page,
  limit,
  url,
  filter,
}: GetParamsProps) {
  const { data: session } = useSession();

  // define fetcher
  const fetcher = useFetcher(session);

  // Pass the fetcher to useSWR
  const { data, error, isLoading, mutate } = useSWR(
    session
      ? `${url}?page=${page}&limit=${limit}${filter && `&${filter}`}`
      : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
