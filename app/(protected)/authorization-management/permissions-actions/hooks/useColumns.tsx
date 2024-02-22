// components import
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

// utils import
import { createColumnHelper } from '@tanstack/react-table'
import type { Permission } from '@/types/authorization'

// hooks import
import { useMemo, useState } from 'react'
import useModalState from '@/hooks/useModalState'

export type SelectedRowType = {
    name?: string
    id: string | number
}
const columnHelper = createColumnHelper<Permission>()

/**
 * 
 * @description
 * useColumns: useColumns hook for CustomerPage
 * @returns
 * columns : columns state for table
 * selectedRow : selectedRow state for getting selected row
 * openEdit : openEdit state for open edit modal
 * openDelete : openDelete state for open delete modal
 * setOpenEdit : setOpenEdit function for open edit modal
 * setOpenDelete : setOpenDelete state function for open delete modal
 * 
 * @example
 * const {
 *      columns,
 *      selectedRow,
 *      openEdit,
 *      openDelete,
 *      setOpenEdit,
 *      setOpenDelete,
 *  } = useColumns()
 */
const useColumns = () => {
    const [selectedRow, setSelectedRow] = useState<null | SelectedRowType>(null)
    const { openEdit, setOpenEdit, openDelete, setOpenDelete } = useModalState()

    const columns = useMemo(
        () => [
            columnHelper.accessor((row) => row, {
                id: 'id',
                header: () => 'No',
                cell: ({ row }) => row.index + 1,
                size: 2,
            }),
            columnHelper.accessor((row) => row.name, {
                id: 'name',
                header: () => 'Name',
                cell: (info) => info.getValue(),
                size: 2,
            }),
            columnHelper.accessor((row) => row.description, {
                id: 'description',
                header: () => 'Description',
                cell: (info) => info.getValue(),
                size: 400,
            }),
        ],
        [],
    )

    return {
        columns,
    }
}

export default useColumns
