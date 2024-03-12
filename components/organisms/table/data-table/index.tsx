'use client'
// utils import
import {
    SortingState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

export type DataTableBaseProps = {
    columns: any[]
    data: any[]
    classNameContainer?: string
    classNameTable?: string
    classNameTableHeader?: string
    classNameTableBody?: string
}

// component for data table base with pagination
export const DataTableBase: React.FC<DataTableBaseProps> = ({
    columns,
    data,
    classNameContainer,
    classNameTable,
    classNameTableHeader,
    classNameTableBody,
}) => {
    // default DataTableBase props
    const config = {
        styleContainer: classNameContainer ?? 'overflow-x-auto w-full rounded-md',
        styleTable: classNameTable ?? 'w-full bg-primary rounded-md ',
        styleTableHeader: classNameTableHeader ?? 'text-left p-8',
        styleTableBody: classNameTableBody ?? '',
    }

    // sorting state
    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        columns,
        data,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })
    return (
        <div className={config.styleContainer}>
            <table className={config.styleTable}>
                <thead className={config.styleTableHeader}>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="p-3 font-bold text-sm text-white"
                                    style={{
                                        width:
                                            header.getSize() !== 0 ? header.getSize() : undefined,
                                    }}
                                >
                                    <div
                                        {...{
                                            className: header.column.getCanSort()
                                                ? 'cursor-pointer select-none'
                                                : '',
                                            onClick: header.column.getToggleSortingHandler(),
                                        }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className={config.styleTableBody}>
                    {table.getRowModel().rows.map((row, rowIndex) => (
                        <tr
                            key={row.id}
                            className={`hover:bg-[rgba(255,255,255,0.1)]`}
                        // className={`${rowIndex === table.getRowModel().rows.length - 1
                        //     ? ''
                        //     : 'border-b border-slate-300'
                        //     } hover:bg-primary-light`}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="p-3 text-sm text-white"
                                    style={{
                                        width:
                                            cell.column.getSize() !== 0
                                                ? cell.column.getSize()
                                                : undefined,
                                    }}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
