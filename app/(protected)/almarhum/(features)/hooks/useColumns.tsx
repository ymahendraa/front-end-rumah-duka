// components import
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Button from '@/components/atoms/button'

// utils import
import { createColumnHelper } from '@tanstack/react-table'
import type { Customer } from '@/types/customer'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { checkPermissions } from '@/utils/checkPermissions'

// hooks import
import { useMemo, useState } from 'react'
import useModalState from '@/hooks/useModalState'
import { useRouter } from 'next/navigation'

export type SelectedRowType = {
    name: string
    id: string
}
const columnHelper = createColumnHelper<Customer>()

/**
 * 
 * @description
 * useColumns: useColumns hook for CustomerPage
 * @param permissions permissions for checking user permissions
 * @returns
 * columns : columns state for table
 * selectedRow : selectedRow state for getting selected row
 * openDelete : openDelete state for open delete modal
 * setOpenDelete : setOpenDelete state function for open delete modal
 * 
 * @example
 * const {
 *      columns,
 *      selectedRow,
 *      openDelete,
 *      setOpenDelete,
 *  } = useColumns(
 *     ['customer.create', 'customer.update', 'customer.delete']
 * )
 */
const useColumns = (permissions: string[]) => {
    const [selectedRow, setSelectedRow] = useState<null | SelectedRowType>(null) // selectedRow state
    const { openDelete, setOpenDelete } = useModalState() // openEdit and openDelete state
    const router = useRouter() // router

    const columns = useMemo(
        () => [
            columnHelper.accessor((row) => row, {
                id: 'no',
                header: () => 'No',
                cell: ({ row }) => row.index + 1,
                size: 10,
            }),
            columnHelper.accessor((row) => row, {
                id: 'id',
                header: () => 'ID',
                cell: ({ row }) => row.id,
                size: 10,
            }),
            columnHelper.accessor((row) => row.first_name, {
                id: 'nama',
                header: () => 'Nama Lengkap',
                cell: (info) => info.getValue(),
                size: 150,
            }),
            columnHelper.accessor((row) => row.last_name, {
                id: 'umur',
                header: () => 'Umur',
                cell: (info) => info.getValue(),
                size: 250,
            }),
            columnHelper.accessor((row) => row.email, {
                id: 'jenis_pekerjaan',
                header: () => 'Pekerjaan',
                cell: (info) => info.getValue(),
                size: 50,
            }),
            columnHelper.accessor((row) => row.join_date, {
                id: 'alamat',
                header: () => 'Alamat',
                cell: (info) => dayjs(info.getValue()).format('DD MMM YYYY'),
                size: 250,
            }),
            columnHelper.accessor((row) => row.join_date, {
                id: 'tempat_meninggal',
                header: () => 'Tempat Meninggal',
                cell: (info) => dayjs(info.getValue()).format('DD MMM YYYY'),
                size: 250,
            }),
            columnHelper.accessor((row) => row.join_date, {
                id: 'diagosa',
                header: () => 'Diagosa',
                cell: (info) => dayjs(info.getValue()).format('DD MMM YYYY'),
                size: 250,
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
                            {checkPermissions(['master.customers.update'], permissions) && (
                                <Button
                                    onClick={() => {
                                        router.push(`/customer/edit-data/${row.id}`)
                                    }}
                                    className='flex items-center justify-center bg-green-500 hover:bg-green-600 w-6 h-6 rounded-md transition-colors duration-300 ease-in-out'
                                >
                                    <PencilSquareIcon className="w-4 h-4" />
                                </Button>
                            )}
                            {checkPermissions(['master.customers.delete'], permissions) && (
                                <Button
                                    onClick={() => {
                                        setSelectedRow({
                                            name: row.first_name + ' ' + row.last_name,
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
        openDelete,
        setOpenDelete,
        selectedRow,
    }
}

export default useColumns
