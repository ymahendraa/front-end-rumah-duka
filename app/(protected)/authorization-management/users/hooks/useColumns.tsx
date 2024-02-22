// components import
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

// utils import
import { createColumnHelper } from '@tanstack/react-table'
import type { User } from '@/types/user'

// hooks import
import { useMemo, useState } from 'react'
import useModalState from '@/hooks/useModalState'

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
            columnHelper.accessor((row) => row.username, {
                id: 'username',
                header: () => 'NIK',
                cell: (info) => info.getValue(),
                size: 10,
            }),
            columnHelper.accessor((row) => row, {
                id: 'name',
                header: () => 'Name',
                cell: (info) => {
                    const firstName = info.getValue()?.first_name
                    const lastName = info.getValue()?.last_name
                    return firstName + ' ' + lastName
                },
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
                    console.log(role)
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
                            <button
                                onClick={() => {
                                    setSelectedRow({
                                        name: row.first_name + ' ' + row.last_name,
                                        id: row.id,
                                    })
                                    setOpenDelete(true)
                                }}
                            >
                                <TrashIcon className="w-5 h-5 hover:text-red-500" />
                            </button>
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
