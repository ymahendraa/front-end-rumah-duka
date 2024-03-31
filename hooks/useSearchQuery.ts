import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const useSearchQuery = () => {
  // define search params
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // define filter state
  const [inputValue, setInputValue] = useState<string>("");

  return {
    inputValue,
    setInputValue,
    // debouncedSearch,
    createQueryString,
    searchParams,
  };
};

export default useSearchQuery;
