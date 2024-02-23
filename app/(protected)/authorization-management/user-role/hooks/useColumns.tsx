// components import
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

// utils import
import { createColumnHelper } from '@tanstack/react-table'
import type { Role } from '@/types/authorization'
import { checkPermissions } from '@/utils/checkPermissions'

// hooks import
import { useMemo, useState } from 'react'
import useModalState from '@/hooks/useModalState'

export type SelectedRowType = {
    name?: string
    id: string | number
}
const columnHelper = createColumnHelper<Role>()

/**
 * 
 * @description
 * useColumns: useColumns hook for CustomerPage
 * @params permissions permissions for checking user permissions
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
const useColumns = (permissions: string[]) => {
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
            columnHelper.accessor((row) => row.description, {
                id: 'description',
                header: () => 'Description',
                cell: (info) => info.getValue(),
                size: 50,
            }),
            columnHelper.accessor((row) => row.permissions, {
                id: 'permissions',
                header: () => 'Total permissions',
                cell: (info) => {
                    const permissions = info.getValue() ?? []
                    return permissions.length
                },
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
                            {checkPermissions(['authorization.role.update'], permissions) && (
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
                            )}
                            {checkPermissions(['authorization.role.delete'], permissions) && (
                                <button
                                    onClick={() => {
                                        setSelectedRow({
                                            name: row.name,
                                            id: row.id,
                                        })
                                        setOpenDelete(true)
                                    }}
                                >
                                    <TrashIcon className="w-5 h-5 hover:text-red-500" />
                                </button>
                            )}
                        </div>
                    )
                },
                size: 10, // Adjust the size as needed
            }),
        ],
        [permissions],
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
