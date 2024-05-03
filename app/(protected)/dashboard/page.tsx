'use client'
import React from 'react'

// components import
import Section from '@/components/atoms/section'
import Icon from '@/components/atoms/icon'
import { ChartBarSquareIcon } from '@heroicons/react/20/solid'
import { formatToRupiah } from '@/utils/formatToRupiah'
import Button from '@/components/atoms/button'
import LineChart from '@/components/atoms/chart/line'
import Loading from '@/components/atoms/loader/loading'
import InputDatepicker from '@/components/atoms/input/input-datepicker'
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'
import { DataTableBase } from '@/components/organisms/table/data-table'
import Pagination from '@/components/organisms/pagination'

// hooks import
import { usePaginationState } from '@/hooks/usePaginationState'
import { useSession } from 'next-auth/react'
import useFetcher from '@/hooks/useFetcher'
import useSWR from 'swr'
import useColumns from './useColumns'

const Home: React.FC = () => {
    const {
        page,
        limit,
        setLimit,
        setPage,
    } = usePaginationState()

    // define start_date, default to date now in 'YYYY-DD-MM' format
    const [start_date, setStartDate] = React.useState(new Date().toISOString().split('T')[0])
    // define end_date, default to date now in 'YYYY-DD-MM' format
    const [end_date, setEndDate] = React.useState(new Date().toISOString().split('T')[0])
    // define filter, default 'start_date=${start_date}&end_date=${end_date}'
    const [filter, setFilter] = React.useState(`start_date=${start_date}&end_date=${end_date}`)

    // get data from api
    const { data: session } = useSession();

    // define fetcher
    const fetcher = useFetcher(session);

    // Pass the fetcher to useSWR
    const { data, error, isLoading, mutate } = useSWR(
        session
            ? `revenue?page=${page}&limit=${limit}&${filter}`
            : null,
        fetcher
    );

    const { columns } = useColumns()

    // const dataChart = [
    //     {
    //         label: '2024',
    //         data: [
    //             { primary: 'Januari', secondary: 25000000 },
    //             { primary: 'Februari', secondary: 110000000 },
    //             { primary: 'Maret', secondary: 120000000 },
    //             { primary: 'April', secondary: 130000000 },
    //             { primary: 'Mei', secondary: 140000000 },
    //             { primary: 'Juni', secondary: 150000000 },
    //             { primary: 'Juli', secondary: 160000000 },
    //             { primary: 'Agustus', secondary: 170000000 },
    //             { primary: 'September', secondary: 180000000 },
    //             { primary: 'Oktober', secondary: 190000000 },
    //             { primary: 'November', secondary: 200000000 },
    //             { primary: 'Desember', secondary: 210000000 },
    //         ]
    //     },
    // ]

    if (isLoading) return <Loading />

    if (error) {
        return (
            <section data-testid="error-component">
                <p>Error</p>
            </section>
        )
    }

    return (
        <div className="h-full bg-base">
            <main className="w-full flex flex-col gap-8">
                <Section className='flex flex-col md:flex-row justify-between bg-primary p-4 rounded-xl'>
                    <Section className='flex gap-4 items-center'>
                        <Icon icon={<ChartBarSquareIcon className='w-12 h-12 bg-red-500 rounded-full p-2' />} />
                        <Section className='flex flex-col gap-2'>
                            <p className='text-gray-500 text-md'>Total Pendapatan (Net)</p>
                            <p className='text-white font-bold text-4xl'>{formatToRupiah(data?.meta?.totalSumTotal)}</p>
                        </Section>
                    </Section>
                    <Section className='flex gap-2 items-end justify-end'>
                        <Section className='flex flex-col'>
                            <p className='text-gray-500 text-md'>Tanggal Awal</p>
                            <InputDatepicker
                                value={start_date}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </Section>
                        <Section className='flex flex-col'>
                            <p className='text-gray-500 text-md'>Tanggal Akhir</p>
                            <InputDatepicker
                                value={end_date}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Section>
                        <Button
                            className='bg-secondary flex items-center justify-center text-white w-10 h-12 rounded-xl hover:bg-secondary-dark cursor-pointer'
                            onClick={() => {
                                setFilter(`start_date=${start_date}&end_date=${end_date}`)
                                mutate()
                            }}>
                            <MagnifyingGlassCircleIcon className='w-8 h-8' />
                        </Button>
                    </Section>
                </Section>
                <Section className='p-4 bg-primary rounded-xl'>
                    <Section className='h-[300px]'>
                        {data?.chart ? <LineChart data={[data.chart]} /> : (
                            <Section className='flex h-full w-full items-center justify-center'>
                                <p className='text-white text-center'>Data tidak ditemukan</p>
                            </Section>
                        )}
                    </Section>
                </Section>

                <Section
                    data-testid='customer-data'
                    className='flex flex-col gap-y-4 bg-primary rounded-xl p-3'
                >
                    <DataTableBase
                        columns={columns}
                        data={data?.data ?? []}
                    />
                    <Pagination
                        page={page}
                        limit={limit}
                        totalPages={data?.meta?.totalPages}
                        totalItems={data?.meta?.totalItems}
                        options={[
                            { value: 10, label: '10' },
                            { value: 20, label: '20' },
                            { value: 50, label: '50' },
                            { value: 100, label: '100' },
                        ]}
                        labelNext={<ChevronRightIcon className='w-5 h-5' />}
                        labelPrev={<ChevronLeftIcon className='w-5 h-5' />}
                        disabledPrev={page === 1}
                        disabledNext={page === data?.meta?.totalPages}
                        setLimit={setLimit}
                        handlePageChange={setPage}
                    />
                </Section>

            </main>
        </div>
    )
}

export default Home
