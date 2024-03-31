'use client'
import React from 'react'
import Section from '@/components/atoms/section'
import Icon from '@/components/atoms/icon'
import { PresentationChartBarIcon } from '@heroicons/react/24/solid'
import { ChartBarSquareIcon } from '@heroicons/react/20/solid'
import { formatToRupiah } from '@/utils/formatToRupiah'
import ComboBoxWrapper from '@/components/atoms/combo-box-wrapper'
import Button from '@/components/atoms/button'
import LineChart from '@/components/atoms/chart/line'
import { DataTableBase } from '@/components/organisms/table/data-table'
import Pagination from '@/components/organisms/pagination'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const Home: React.FC = () => {

    const data = [
        {
            label: '2024',
            data: [
                { primary: 'Januari', secondary: 25000000 },
                { primary: 'Februari', secondary: 110000000 },
                { primary: 'Maret', secondary: 120000000 },
                { primary: 'April', secondary: 130000000 },
                { primary: 'Mei', secondary: 140000000 },
                { primary: 'Juni', secondary: 150000000 },
                { primary: 'Juli', secondary: 160000000 },
                { primary: 'Agustus', secondary: 170000000 },
                { primary: 'September', secondary: 180000000 },
                { primary: 'Oktober', secondary: 190000000 },
                { primary: 'November', secondary: 200000000 },
                { primary: 'Desember', secondary: 210000000 },
            ]
        },
    ]

    const revenue = 150250000
    return (
        <div className="h-full bg-base">
            <main className="w-full flex flex-col gap-8">
                <Section className='flex flex-col md:flex-row justify-between bg-primary p-4 rounded-xl'>
                    <Section className='flex gap-4 items-center'>
                        <Icon icon={<ChartBarSquareIcon className='w-12 h-12 bg-red-500 rounded-full p-2' />} />
                        <Section className='flex flex-col gap-2'>
                            <p className='text-gray-500 text-md'>Total Pendapatan (Net)</p>
                            <p className='text-white font-bold text-4xl'>{formatToRupiah(revenue)}</p>
                        </Section>
                    </Section>
                    <Section className='flex flex-col gap-2 items-start'>
                        <p className='text-gray-500 text-md text-left'>Tahun</p>
                        <Section className='flex gap-4'>
                            <ComboBoxWrapper value='' onChange={() => { }} onBlur={() => { }} label='' options={[{ value: 2021, label: '2021' }, { value: 2022, label: '2022' }]}
                                inputDark={false}
                            />
                            <Button className='bg-secondary text-white w-36 rounded-xl hover:bg-secondary-dark cursor-pointer' onClick={() => { }}>Cari</Button>
                        </Section>
                    </Section>
                </Section>
                <Section className='p-4 bg-primary rounded-xl'>
                    <Section className='h-[300px]'>
                        <LineChart data={data} />
                    </Section>
                </Section>

                <Section
                    data-testid='customer-data'
                    className='flex flex-col gap-y-4 bg-primary rounded-xl p-3'
                >
                    <p>TEST</p>
                    {/* <DataTableBase
                        columns={columns}
                        data={Array.isArray(data) ? data : []}
                    />
                    <Pagination
                        page={page}
                        limit={limit}
                        totalPages={5}
                        // totalPages={data?.meta?.totalPages}
                        totalItems={50}
                        options={[
                            { value: 10, label: '10' },
                            { value: 20, label: '20' },
                            { value: 50, label: '50' },
                            { value: 100, label: '100' },
                        ]}
                        labelNext={<ChevronRightIcon className='w-5 h-5' />}
                        labelPrev={<ChevronLeftIcon className='w-5 h-5' />}
                        disabledPrev={page === 1}
                        disabledNext={page === 5}
                        // disabledNext={page === data?.meta?.totalPages}
                        setLimit={setLimit}
                        handlePageChange={setPage}
                    /> */}
                </Section>

            </main>
        </div>
    )
}

export default Home
