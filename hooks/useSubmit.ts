// utils import
import { useState } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import useFetcher from "./useFetcher";

type SubmitHandlerProps = {
  config: any;
  url: string;
  setOpen?: (open: boolean) => void;
  mutate?: () => void;
};

/**
 * @description
 * useSubmit : custom hook for handling post/patch/delete data
 * @returns
 * submitHandler : function for handling post/patch data
 * isLoading : boolean for checking loading state
 *
 * @example
 * const { submitHandler, isLoading } = useSubmit()
 */
const useSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);

  // define session and fetcher instance
  const { data: session } = useSession();
  const fetcher = useFetcher(session);

  /**
   * @description
   * submitHandler : function for handling post/patch/delete data
   * @param url url for fetching data
   * @param config config for fetching data
   * @param setOpen setOpen function for open modal
   * @param mutate mutate function for mutate data after fetching
   * @returns
   * response : response from fetching data
   */
  const submitHandler = async ({
    url,
    config,
    setOpen,
    mutate,
  }: SubmitHandlerProps): Promise<any> => {
    setIsLoading(true);
    try {
      const response = await fetcher(url, config);
      // show success Swal
      Swal.fire({
        icon: "success",
        title: "Success",
        confirmButtonColor: "#D9A878",
        text: `Data has been ${
          config?.method == "DELETE" ? "deleted" : "saved"
        }`,
      });
      mutate && mutate();
      return response;
    } catch (error: any) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oopps...",
        text: error,
      });
      throw error;
    } finally {
      setOpen && setOpen(false);
      setIsLoading(false);
    }
  };

  return { submitHandler, isLoading };
};

export default useSubmit;
