import { useMemo } from "react";

/**
 * @description useTransformBarang : custom hook to transform object barang to value and label
 * @param object list of object
 * @param label label of object
 * @returns array of object with value and label
 */
const useTransformBarang = (
  object: Record<string, any>[],
  label: string = "name"
) => {
  return useMemo(() => {
    return object.map((item) => {
      return {
        value: `${item.id};${item.nama_barang};${item.jenis_barang};${item.harga}`,
        label: item[label],
      };
    });
  }, [object]);
};

export default useTransformBarang;
