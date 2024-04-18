import { useState } from "react";
import Swal from "sweetalert2";

type AddDetail = {
  append: Function;
  update: Function;
  setOpen: Function;
  details: Array<{
    id: number;
    nama_barang: string;
    jenis_barang: string;
    stok: number;
    total_harga: number;
    harga: number;
  }>;
};

/**
 * @description useOperatingDetail : custom hook for operating detail barang
 * @param append : function to append detail barang
 * @param update : function to update detail barang
 * @param setOpen : function to set open state
 * @param details : array of detail barang
 * @returns
 */
const useOperatingDetail = ({
  append,
  update,
  setOpen,
  details,
}: AddDetail) => {
  const [id, setId] = useState("");
  const [detailName, setDetailName] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("Free");
  const [quantity, setQuantity] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  /**
   * @description resetDetail : function to reset detail barang
   * @returns void
   */
  const resetDetail = (): void => {
    setId("");
    setDetailName("");
    setPrice(0);
    setQuantity(1);
    setType("Free");
    setSelectedIndex(-1);
    setOpen(false);
  };

  /**
   * @description addDetail : function to add detail barang to current reservasi
   * @returns void
   */
  const addDetail = (): void => {
    const isExist = validateDetail();
    if (isExist) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Detail barang sudah ada",
      });
      return;
    }
    // get id from id
    const idDetail = parseInt(id.split(";")[0]);
    append({
      id: idDetail,
      nama_barang: detailName,
      jenis_barang: type,
      stok: quantity,
      total_harga: price * quantity,
      harga: price,
    });
    resetDetail();
  };

  /**
   * @description editHandler : function for handling edit button
   * @param {number} index : index of selected row
   * @returns void
   */
  const editHandler = (index: number) => {
    setSelectedIndex(index);
    setOpen(true);
    setId(
      `${details[index].id};${details[index].nama_barang};${details[index].jenis_barang};${details[index].harga}`
    );
    setDetailName(details[index].nama_barang);
    setPrice(details[index].harga);
    setType(details[index].jenis_barang);
    setQuantity(details[index].stok);
  };

  /**
   * @description editDetail : function to edit detail barang
   * @returns void
   */
  const editDetail = () => {
    const isExist = validateDetail();
    if (isExist) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Detail barang sudah ada",
      });
      return;
    }
    // get id from id
    const idDetail = parseInt(id.split(";")[0]);
    update(selectedIndex, {
      id: idDetail,
      nama_barang: detailName,
      jenis_barang: type,
      stok: quantity,
      harga: price,
      total_harga: price * quantity,
    });
    resetDetail();
  };

  /**
   * @description validateDetail : function to validate detail barang, it will check if there is already same detail barang
   * @returns boolean
   *
   */
  const validateDetail = (): boolean => {
    // get id from id
    const idDetail = parseInt(id.split(";")[0]);
    return details.some(
      (detail) => detail.id === idDetail && detail.nama_barang === detailName
    );
  };

  return {
    id,
    setId,
    detailName,
    setDetailName,
    price,
    setPrice,
    type,
    setType,
    quantity,
    setQuantity,
    addDetail,
    selectedIndex,
    editHandler,
    editDetail,
    resetDetail,
  };
};

export default useOperatingDetail;
