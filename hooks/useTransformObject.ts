import { useMemo } from "react";

/**
 * @description useTransformObject : custom hook to transform object to value and label
 * @param object list of object
 * @param value value of object
 * @param label label of object
 * @returns array of object with value and label
 */
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
