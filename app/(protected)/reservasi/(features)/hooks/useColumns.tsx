// components import
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Button from '@/components/atoms/button'
import Image from 'next/image'

// utils import
import { createColumnHelper } from '@tanstack/react-table'
import { Reservasi } from '../types/Reservasi'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { checkPermissions } from '@/utils/checkPermissions'

// hooks import
import { useMemo, useState } from 'react'
import useModalState from '@/hooks/useModalState'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatToRupiah } from '@/utils/formatToRupiah'
import PopOver from '@/components/atoms/pop-over'
import Section from '@/components/atoms/section'

export type SelectedRowType = {
    name: string
    id: string
}
const columnHelper = createColumnHelper<Reservasi>()

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
            columnHelper.accessor((row) => row.status, {
                id: 'status',
                header: () => 'Status Transaksi',
                cell: (info) => info.getValue(),
                size: 150,
            }),
            columnHelper.accessor((row) => row.sum_total, {
                id: 'total',
                header: () => 'Total Harga',
                cell: (info) => {
                    const total = info.getValue() ? Number(info.getValue()) : 0
                    return formatToRupiah(total)
                },
                size: 250,
            }),
            columnHelper.accessor((row) => row.nama_lengkap, {
                id: 'nama',
                header: () => 'Nama Almarhum',
                cell: (info) => info.getValue(),
                size: 50,
            }),
            columnHelper.accessor((row) => row.reservation_date, {
                id: 'tanggal_reservasi',
                header: () => 'Tanggal Reservasi',
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
                            {checkPermissions(['transaction.reservation.generate-pdf'], permissions) && (
                                <PopOver
                                    PopOverButton={
                                        <Section
                                            // onClick={() => {
                                            //     // push to generate pdf page
                                            //     // in new tab
                                            //     router.push(`${process.env.NEXT_PUBLIC_REAL_URL}/generate-pdf/${row.id_reservasi}`)
                                            // }}
                                            // target='_blank'
                                            // href={`${process.env.NEXT_PUBLIC_REAL_URL}/generate_pdf/${row.id_reservasi}`}
                                            className='flex items-center justify-center bg-white hover:bg-gray-200 w-6 h-6 rounded-md transition-colors duration-300 ease-in-out'
                                        >
                                            <Image src="./pdf.svg" alt="pdf-icon" width={12} height={15} />
                                        </Section>
                                    }
                                    PopOverPanel={
                                        <Section
                                            className='flex flex-col items-start justify-between text-black'
                                        >
                                            <Link
                                                href={`${process.env.NEXT_PUBLIC_REAL_URL}/generate_pdf/${row.id_reservasi}`}
                                                target='_blank'
                                                // href='#'
                                                className='hover:bg-primary-light w-full rounded-md p-2 transition-colors duration-300 ease-in-out'
                                            >
                                                Invoice
                                            </Link>
                                            <Link
                                                href={`${process.env.NEXT_PUBLIC_REAL_URL}/generate_kwitansi/${row.id_reservasi}`}
                                                target='_blank'
                                                // href='#'
                                                className='hover:bg-primary-light w-full rounded-md p-2 transition-colors duration-300 ease-in-out'
                                            >
                                                Receipt
                                            </Link>
                                        </Section>
                                    }
                                />

                            )}
                            {checkPermissions(['transaction.reservation.update'], permissions) && (
                                <Button
                                    onClick={() => {
                                        router.push(`/reservasi/edit-data/${row.id_reservasi}`)
                                    }}
                                    className='flex items-center justify-center bg-green-500 hover:bg-green-600 w-6 h-6 rounded-md transition-colors duration-300 ease-in-out'
                                >
                                    <PencilSquareIcon className="w-4 h-4" />
                                </Button>
                            )}
                            {checkPermissions(['transaction.reservation.delete'], permissions) && (
                                <Button
                                    onClick={() => {
                                        setSelectedRow({
                                            name: row.nama_lengkap,
                                            id: String(row.id_reservasi),
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
