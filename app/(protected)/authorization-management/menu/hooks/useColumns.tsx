// components import
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

// utils import
import { createColumnHelper } from '@tanstack/react-table'
import type { GroupMenu } from '@/types/authorization'

// hooks import
import { useMemo, useState } from 'react'
import useModalState from '@/hooks/useModalState'

export type SelectedRowType = {
    name?: string
    id: string | number
}
const columnHelper = createColumnHelper<GroupMenu>()

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
                size: 10,
            }),
            columnHelper.accessor((row) => row.name, {
                id: 'name',
                header: () => 'Name',
                cell: (info) => info.getValue(),
                size: 50,
            }),
            columnHelper.accessor((row) => row.group, {
                id: 'group',
                header: () => 'Group',
                cell: (info) => {
                    const group = info.getValue() ?? '-'
                    return group.code
                },

                size: 50,
            }),
            columnHelper.accessor((row) => row.position, {
                id: 'position',
                header: () => 'Position',
                cell: (info) => info.getValue(),
                size: 50,
            }),
            columnHelper.accessor((row) => row.description, {
                id: 'description',
                header: () => 'Description',
                cell: (info) => info.getValue(),
                size: 50,
            }),
            columnHelper.accessor((row) => row, {
                id: 'actions',
                header: () => 'Actions',
                enableSorting: false,
                cell: (info) => {
                    // You can place your action buttons here
                    const row = info.getValue()
                    return (
                        <div className="flex flex-row gap-x-2">
                            <button
                                onClick={() => {
                                    setSelectedRow({
                                        // name: row.first_name + ' ' + row.last_name,
                                        id: row.id,
                                    })
                                    setOpenEdit(true)
                                }}
                            >
                                <PencilSquareIcon className="w-5 h-5 hover:text-secondary" />
                            </button>
                            {/* <button
                                onClick={() => {
                                    setSelectedRow({
                                        name: row.name,
                                        id: row.id,
                                    })
                                    setOpenDelete(true)
                                }}
                            >
                                <TrashIcon className="w-5 h-5 hover:text-red-500" />
                            </button> */}
                        </div>
                    )
                },
                size: 10, // Adjust the size as needed
            }),
        ],
        [],
    )

    return {
        columns,
        selectedRow,
        openEdit,
        openDelete,
        setOpenEdit,
        setOpenDelete,
    }
}

export default useColumns
