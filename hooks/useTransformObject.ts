import { useMemo } from "react";

const useTransformObject = (object: Record<string, any>[]) => {
  return useMemo(() => {
    // if (!object) {
    //   return null;
    // }

    return object.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
  }, [object]);
};

export default useTransformObject;
