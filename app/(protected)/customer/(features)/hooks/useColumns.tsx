// components import
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Button from '@/components/atoms/button'

// utils import
import { createColumnHelper } from '@tanstack/react-table'
// import dayjs from 'dayjs'
// import 'dayjs/locale/id'
import { checkPermissions } from '@/utils/checkPermissions'
import { ReceivedCustomer } from '../types/Customer'

// hooks import
import { useMemo, useState } from 'react'
import useModalState from '@/hooks/useModalState'
import { useRouter } from 'next/navigation'

export type SelectedRowType = {
    name: string
    id: string
}
const columnHelper = createColumnHelper<ReceivedCustomer>()

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
            columnHelper.accessor((row) => row.id, {
                id: 'id',
                header: () => 'ID Customer',
                cell: (info) => info.getValue(),
                size: 100,
            }),
            columnHelper.accessor((row) => row.nik, {
                id: 'nik',
                header: () => 'NIK',
                cell: (info) => info.getValue(),
                size: 150,
            }),
            columnHelper.accessor((row) => row.name, {
                id: 'nama',
                header: () => 'Nama Lengkap',
                cell: (info) => info.getValue(),
                size: 150,
            }),
            columnHelper.accessor((row) => row.pekerjaan, {
                id: 'jenis_pekerjaan',
                header: () => 'Pekerjaan',
                cell: (info) => info.getValue(),
                size: 50,
            }),
            columnHelper.accessor((row) => row.hub_almarhum, {
                id: 'hubungan',
                header: () => 'Hubungan Dengan Almarhum',
                cell: (info) => info.getValue(),
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
        openDelete,
        setOpenDelete,
        selectedRow,
    }
}

export default useColumns
