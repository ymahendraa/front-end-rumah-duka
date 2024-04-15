'use client'

// components import
import Section from '@/components/atoms/section'
import CRUDHeaderSection from '@/components/organisms/sections/crud-header-section'
import { DataTableBase } from '@/components/organisms/table/data-table'
// import Pagination from '@/components/organisms/pagination'
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Loading from '../../../../components/atoms/loader/loading'
import useSearchQuery from '@/hooks/useSearchQuery'

// hooks import
import { usePaginationState } from '@/hooks/usePaginationState'
import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import useColumns from './hooks/useColumns'
import useDebounce from '@/hooks/useDebounce'
import { useGetDataWithPagination } from '@/hooks/useGetDataWithPagination'
// import formatCurrentPath from '@/utils/formatCurrentPath'

/**
 * 
 * @description
 * PermissionsPage: PermissionsPage component for showing list of permissions
 * @return PermissionsPage component
 */
const PermissionsPage = () => {
    // get the current route path
    const path = usePathname()

    // define router
    const router = useRouter()

    // get pagination state
    const {
        page,
        limit,
        // setLimit,
        // setPage,
    } = usePaginationState()

    // get columns data
    const {
        columns,
    } = useColumns()

    // call useSearchQuery
    const { inputValue, setInputValue, createQueryString } = useSearchQuery();

    // debounce the search input value
    const debouncedSearch = useDebounce(inputValue, 500);

    // update the URL when the debounced input value changes
    useEffect(() => {
        router.push(path + '?' + createQueryString('q', debouncedSearch));
    }, [debouncedSearch, createQueryString, path, router]);


    // get data from api
    const { data, isLoading } = useGetDataWithPagination({
        page,
        limit,
        filter: debouncedSearch,
        url: 'authorization/permissions',
        // accessToken,
    })

    if (isLoading || !data) {
        return (
            <section data-testid="loading-component">
                <Loading />
            </section>
        )
    }
    return (
        <main className='flex flex-col gap-y-4'>
            <Section
                data-testid='create-button'
            >
                <CRUDHeaderSection
                    disableCreate
                    // onClickCreate={() => setOpen(true)}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    advancedSearch={false}
                />
            </Section>
            <Section
                data-testid='group-menu-data'
            >
                <DataTableBase
                    columns={columns}
                    data={data?.data ?? []}
                />
                {/* <Pagination
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
                    // disabledNext={page === data?.meta?.totalPages}
                    setLimit={setLimit}
                    handlePageChange={setPage}
                /> */}
            </Section>

        </main>
    )
}

export default PermissionsPage