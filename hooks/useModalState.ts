import { useState } from "react";

/**
 *
 * @description
 * useModalState: custom hook to handle modal state
 * @returns
 * openEdit: state for edit modal
 * setOpenEdit: function to set state for edit modal
 * openDelete: state for delete modal
 * setOpenDelete: function to set state for delete modal
 * open: state for modal
 * setOpen: function to set state for modal
 *
 * @example
 * const { openEdit, setOpenEdit, openDelete, setOpenDelete, open, setOpen } = useModalState();
 */
const useModalState = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  return {
    openEdit,
    setOpenEdit,
    openDelete,
    setOpenDelete,
    open,
    setOpen,
  };
};

export default useModalState;
