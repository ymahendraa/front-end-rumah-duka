// utils import
import { useState } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import useFetcher from "./useFetcher";
import { useRouter } from "next/navigation";

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

  // router instance
  const router = useRouter();

  /**
   * @description
   * submitHandler : function for handling post/patch/delete data
   * @param url url for fetching data
   * @param config config for fetching data
   * @param setOpen setOpen function for open modal
   * @param mutate mutate function for mutate data after fetching
  //  * @param callbackUrl callbackUrl for redirecting after fetching
   * @returns
   * response : response from fetching data
   */
  const submitHandler = async ({
    url,
    config,
    setOpen,
    mutate,
  }: // callbackUrl,
  SubmitHandlerProps): Promise<any> => {
    setIsLoading(true);
    try {
      const response = await fetcher(url, config);
      console.log("response from submit", response);

      // show success Swal
      // if ok is clicked, router.back() will be executed
      Swal.fire({
        icon: "success",
        title: "Success",
        confirmButtonColor: "#3B93F7",
        text: `Data has been ${
          config?.method == "DELETE" ? "deleted" : "saved"
        }`,
      }).then((result) => {
        if (result.isConfirmed) {
          router.back();
        }
      });

      mutate && mutate();
      return response;
    } catch (error: any) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oopps...",
        text: error.message,
      });
      return error;
    } finally {
      setOpen && setOpen(false);
      setIsLoading(false);
    }
  };

  return { submitHandler, isLoading };
};

export default useSubmit;
