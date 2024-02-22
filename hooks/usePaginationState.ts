import { useState } from "react";

/**
 * @description
 * usePaginationState: custom hook to handle pagination state
 * @returns
 * page: state for page
 * limit: state for limit
 * setPage: function to set state for page
 * setLimit: function to set state for limit
 * handleLimitChange: function to handle limit change
 *
 * @example
 * const { page, limit, setPage, setLimit, handleLimitChange } = usePaginationState();
 */
export const usePaginationState = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10); // Set an initial value for limit

  /**
   * @description
   * handleLimitChange: function to handle limit change
   * @param newLimit number of limit to be set
   * @returns void
   */
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset the page to 1 when the limit changes
  };

  return { page, limit, setPage, setLimit, handleLimitChange };
};
