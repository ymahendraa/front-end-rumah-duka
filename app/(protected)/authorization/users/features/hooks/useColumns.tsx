// components import
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

// utils import
import { createColumnHelper } from '@tanstack/react-table'
import type { User } from '@/types/user'

// hooks import
import { useMemo, useState } from 'react'
import useModalState from '@/hooks/useModalState'
import { checkPermissions } from '@/utils/checkPermissions'
import Button from '@/components/atoms/button'

export type SelectedRowType = {
    name?: string
    id: string | number
}
const columnHelper = createColumnHelper<User>()

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
            columnHelper.accessor((row) => row.username, {
                id: 'username',
                header: () => 'NIK',
                cell: (info) => info.getValue(),
                size: 10,
            }),
            columnHelper.accessor((row) => row.name, {
                id: 'name',
                header: () => 'Name',
                cell: (info) => info.getValue(),
                size: 50,
            }),
            columnHelper.accessor((row) => row.email, {
                id: 'email',
                header: () => 'Email',
                cell: (info) => info.getValue(),
                size: 50,
            }),
            columnHelper.accessor((row) => row.phone, {
                id: 'phone',
                header: () => 'Phone',
                cell: (info) => info.getValue(),
                size: 50,
            }),
            columnHelper.accessor((row) => row.role, {
                id: 'role',
                header: () => 'Roles',
                cell: (info) => {
                    const role = info.getValue()
                    if (Array.isArray(role)) {
                        return role.join(', ')
                    }
                    return role
                },
                size: 50,
            }),
            columnHelper.accessor((row) => row.status, {
                id: 'status',
                header: () => 'Status',
                cell: (info) => info.getValue() ? 'Active' : 'Inactive',
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
                            {checkPermissions(['authorization.users.update'], permissions) && (
                                <Button
                                    onClick={() => {
                                        setSelectedRow({
                                            // name: row.first_name + ' ' + row.last_name,
                                            id: row.id,
                                        })
                                        setOpenEdit(true)
                                    }}
                                    className='flex items-center justify-center bg-green-500 hover:bg-green-600 w-6 h-6 rounded-md transition-colors duration-300 ease-in-out'
                                >
                                    <PencilSquareIcon className="w-4 h-4" />
                                </Button>
                            )}
                            {checkPermissions(['authorization.users.delete'], permissions) && (
                                <Button
                                    onClick={() => {
                                        setSelectedRow({
                                            name: row.name,
                                            id: row.id,
                                        })
                                        setOpenDelete(true)
                                    }}
                                    className='flex items-center justify-center bg-red-500 hover:bg-red-600 w-6 h-6 rounded-md transition-colors duration-300 ease-in-out'

                                >
                                    <TrashIcon className="w-4 h-4" />
                                </Button>)}
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
