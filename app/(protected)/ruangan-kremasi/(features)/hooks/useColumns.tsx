// components import
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Button from '@/components/atoms/button'
// import Image from 'next/image'

// utils import
import { createColumnHelper } from '@tanstack/react-table'
import 'dayjs/locale/id'
import { RuanganKremasi } from '../types/RuanganKremasi'
import { checkPermissions } from '@/utils/checkPermissions'

// hooks import
import { useMemo, useState } from 'react'
import useModalState from '@/hooks/useModalState'
import { useRouter } from 'next/navigation'
import { formatToRupiah } from '@/utils/formatToRupiah'

export type SelectedRowType = {
    name: string
    id: string
}
const columnHelper = createColumnHelper<RuanganKremasi>()

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
                id: 'id',
                header: () => 'No',
                cell: ({ row }) => row.index + 1,
                size: 10,
            }),
            columnHelper.accessor((row) => row.id, {
                id: 'nomor_ruangan',
                header: () => 'Nomor Ruangan',
                cell: (info) => info.getValue(),
                size: 150,
            }),
            columnHelper.accessor((row) => row.jadwal, {
                id: 'jadwal',
                header: () => 'Jadwal',
                cell: (info) => info.getValue(),
                size: 250,
            }),
            // columnHelper.accessor((row) => row.category_room, {
            //     id: 'kategori',
            //     header: () => 'Kategori',
            //     cell: (info) => info.getValue(),
            //     size: 250,
            // }),
            columnHelper.accessor((row) => row.harga, {
                id: 'harga',
                header: () => 'Harga',
                cell: (info) => {
                    const value = info.getValue()
                    return formatToRupiah(value)
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
                            {checkPermissions(['master.kremation-room.update'], permissions) && (
                                <Button
                                    onClick={() => {
                                        router.push(`/ruangan-kremasi/edit-data/${row.id}`)
                                    }}
                                    className='flex items-center justify-center bg-green-500 hover:bg-green-600 w-6 h-6 rounded-md transition-colors duration-300 ease-in-out'
                                >
                                    <PencilSquareIcon className="w-4 h-4" />
                                </Button>
                            )}
                            {checkPermissions(['master.kremation-room.delete'], permissions) && (
                                <Button
                                    onClick={() => {
                                        setSelectedRow({
                                            name: row.no_ruangan,
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
