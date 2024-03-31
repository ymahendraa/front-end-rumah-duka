import { useMemo } from "react";

const useTransformObject = (
  object: Record<string, any>[],
  value: string = "id",
  label: string = "name"
) => {
  return useMemo(() => {
    // if (!object) {
    //   return null;
    // }

    return object.map((item) => {
      return {
        value: item[value],
        label: item[label],
      };
    });
  }, [object]);
};

export default useTransformObject;
