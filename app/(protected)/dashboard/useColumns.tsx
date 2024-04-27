// components import
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Button from '@/components/atoms/button'

// utils import
import { createColumnHelper } from '@tanstack/react-table'
import { Revenue } from './Dashboard'

// hooks import
import { useMemo } from 'react'
import dayjs from 'dayjs'
import { formatToRupiah } from '@/utils/formatToRupiah'

export type SelectedRowType = {
    name: string
    id: string | number
}
const columnHelper = createColumnHelper<Revenue>()

/**
 * 
 * @description
 * useColumns: useColumns hook for CustomerPage
 * @returns
 * columns : columns state for table
 * 
 * @example
 * const {
 *     columns,
 * } = useColumns()
 */
const useColumns = () => {

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
            columnHelper.accessor((row) => row.reservation_date, {
                id: 'reservation_date',
                header: () => 'Tanggal',
                cell: (info) => dayjs(info.getValue()).format('DD MMM YYYY'),
                size: 150,
            }),
            columnHelper.accessor((row) => row.nama_lengkap, {
                id: 'nama_lengkap',
                header: () => 'Nama Lengkap',
                cell: (info) => info.getValue(),
                size: 150,
            }),
            columnHelper.accessor((row) => row.sum_total, {
                id: 'total_harga',
                header: () => 'Total Harga',
                cell: (info) => {
                    const value = info.getValue()
                    const rupiahValue = formatToRupiah(value)
                    return rupiahValue
                },
                size: 150,
            }),
        ],
        [],
    )

    return {
        columns,
        // openDelete,
        // setOpenDelete,
        // selectedRow,
    }
}

export default useColumns
