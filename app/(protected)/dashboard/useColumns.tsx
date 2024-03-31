// components import
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Button from '@/components/atoms/button'

// utils import
import { createColumnHelper } from '@tanstack/react-table'
import { Reservasi } from '../reservasi/(features)/types/Reservasi'

// hooks import
import { useMemo, useState } from 'react'
import useModalState from '@/hooks/useModalState'

export type SelectedRowType = {
    name: string
    id: string | number
}
const columnHelper = createColumnHelper<Reservasi>()

/**
 * 
 * @description
 * useColumns: useColumns hook for CustomerPage
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
const useColumns = (editHandler: any, deleteHandler: any, fields: any) => {
    const [selectedRow, setSelectedRow] = useState<null | SelectedRowType>(null) // selectedRow state
    const { openDelete, setOpenDelete } = useModalState() // openEdit and openDelete state

    const columns = useMemo(
        () => [
            columnHelper.accessor((row) => row, {
                id: 'id',
                header: () => 'No',
                cell: ({ row }) => row.index + 1,
                size: 10,
            }),
            columnHelper.accessor((row) => row.id_reservasi, {
                id: 'id_reservasi',
                header: () => 'ID Reservasi',
                cell: (info) => info.getValue(),
                size: 150,
            }),
            columnHelper.accessor((row) => row., {
                id: 'jenis_barang',
                header: () => 'Jenis Barang',
                cell: (info) => info.getValue(),
                size: 250,
            }),
            columnHelper.accessor((row) => row.stok, {
                id: 'kuantitas',
                header: () => 'Kuantitas',
                cell: (info) => info.getValue(),
                size: 50,
            }),
            columnHelper.accessor((row) => row.total_harga, {
                id: 'total_harga',
                header: () => 'Total Harga',
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
                            {/* {checkPermissions(['master.customers.update'], permissions) && ( */}
                            <Button
                                // onClick={() => {
                                //     router.push(`/customer/edit-data/${row.id}`)
                                // }}
                                type='button'
                                onClick={() => editHandler(info.row.index)}
                                className='flex items-center justify-center bg-green-500 hover:bg-green-600 w-6 h-6 rounded-md transition-colors duration-300 ease-in-out'
                            >
                                <PencilSquareIcon className="w-4 h-4" />
                            </Button>
                            {/* )} */}

                            {/* {checkPermissions(['master.customers.delete'], permissions) && ( */}
                            <Button
                                onClick={() => deleteHandler(info.row.index)}
                                type='button'
                                className='flex items-center justify-center bg-red-500 hover:bg-red-600 w-6 h-6 rounded-md transition-colors duration-300 ease-in-out'

                            >
                                <TrashIcon className="w-4 h-4" />
                            </Button>
                            {/* )} */}
                        </div>
                    )
                },
                size: 10, // Adjust the size as needed
            }),
        ],
        [fields],
    )

    return {
        columns,
        openDelete,
        setOpenDelete,
        selectedRow,
    }
}

export default useColumns
