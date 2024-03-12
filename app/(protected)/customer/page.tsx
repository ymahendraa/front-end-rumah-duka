'use client'
import React, { useCallback, useContext } from 'react'

// components import
import Loading from '../loading'
import Pagination from '@/components/organisms/pagination'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { DataTableBase } from '@/components/organisms/table/data-table'
import Modal from '@/components/atoms/modal'
import Create from './(features)/components/Create'
import Edit from './(features)/components/Edit'
import DeleteModalContent from '@/components/molecules/delete-modal-content'
import Section from '@/components/atoms/section'
import InputDatepicker from '@/components/atoms/input/input-datepicker'
import Button from '@/components/atoms/button'
import InputText from '@/components/atoms/input/input-text'

// hooks import
import useColumns from './(features)/hooks/useColumns'
import { useGetDataWithPagination } from '@/hooks/useGetDataWithPagination'
import { usePaginationState } from '@/hooks/usePaginationState'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import useModalState from '@/hooks/useModalState'
import useDebounce from '@/hooks/useDebounce'
import useSubmit from '@/hooks/useSubmit'

// utils import
import CRUDHeaderSection from '@/components/organisms/sections/crud-header-section'
import { AuthorizationContext } from '@/context/AuthorizationContext/context'
import { TODO } from '@/types/todo'
import { checkPermissions } from '@/utils/checkPermissions'

/**
 * 
 * @description
 * CustomerPage: CustomerPage component for showing customer data
 * @return CustomerPage component
 */
const CustomerPage = () => {
    const authData: TODO = useContext(AuthorizationContext) // get auth data from context
    const permissions = authData?.group?.permissions // get permissions from auth data

    // define search params
    const searchParams = useSearchParams()

    // define pathname
    const pathname = usePathname()

    // define router
    const router = useRouter()

    // get pagination state
    const {
        page,
        limit,
        setLimit,
        setPage,
    } = usePaginationState()

    // get columns data
    const {
        columns,
        selectedRow,
        openDelete,
        setOpenDelete,
    } = useColumns(permissions)

    // get modal state
    const {
        open,
        setOpen,
    } = useModalState()

    // define submit handler
    // get submit handler
    const { submitHandler, isLoading: isLoadingSubmit } = useSubmit()

    // define filter params
    const q: string = searchParams.get('q') ?? ''

    // define filter state
    const [joinDateFrom, setJoinDateFrom] = React.useState(searchParams.get('join-date-from') ?? '')
    const [joinDateTo, setJoinDateTo] = React.useState(searchParams.get('join-date-to') ?? '')
    const [querySearch, setQuerySearch] = React.useState(searchParams.get('q') ?? '')

    // define debounced filter state
    const debouncedSearch = useDebounce(searchParams.toString(), 500)

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    // get data from api
    const { data, isLoading, mutate } = useGetDataWithPagination({
        page,
        limit,
        filter: debouncedSearch,
        url: 'master/customers',
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
                    onClickCreate={() => router.push('customer/tambah-data')}
                    value={q}
                    onChange={(e) => {
                        router.push(pathname + '?' + createQueryString('q', e.target.value))
                    }}
                    disableCreate={!checkPermissions(['master.customers.create'], permissions)}
                    PopOverComponent={
                        <Section className='w-full flex flex-col gap-2 text-slate-500 text-sm' >
                            <p>Advanced Filter</p>
                            <Section className='flex flex-wrap gap-2 justify-between'>
                                <InputDatepicker
                                    label='Join Date From'
                                    value={joinDateFrom}
                                    classNameWrapper='w-full'
                                    onChange={(e) => setJoinDateFrom(e.target.value)}
                                />
                                <InputDatepicker
                                    label='Join Date To'
                                    classNameWrapper='w-full'
                                    value={joinDateTo}
                                    onChange={(e) => setJoinDateTo(e.target.value)}
                                />
                                <InputText
                                    label='Query search'
                                    classNameWrapper='w-full'
                                    value={querySearch}
                                    placeholder='Search by Name or Email'
                                    onChange={(e) => setQuerySearch(e.target.value)}
                                />
                            </Section>
                            <Button
                                className='bg-primary text-white rounded-md p-1 hover:bg-primary-dark text-sm'
                                type='button'
                                onClick={() => {
                                    router.push(pathname + '?' + createQueryString('join-date-from', joinDateFrom) + '&' + createQueryString('join-date-to', joinDateTo) + '&' + createQueryString('q', querySearch))
                                }}
                            >
                                Search
                            </Button>
                        </Section>
                    }
                />
            </Section>
            <Section
                data-testid='customer-data'
                className='flex flex-col gap-y-4 bg-primary rounded-xl p-3'
            >
                <DataTableBase
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
                />
            </Section>

            {/* modal delete */}
            <Modal
                isOpen={openDelete}
                setIsOpen={setOpenDelete}
                dialogTitle='Perhatian!'
                dialogContent={
                    <DeleteModalContent
                        name={selectedRow?.name}
                        setOpen={setOpenDelete}
                        isLoading={isLoadingSubmit}
                        deleteHandler={() => submitHandler({
                            url: `master/customers/${selectedRow?.id}`,
                            config: {
                                method: 'DELETE',
                            },
                            setOpen: setOpenDelete,
                            mutate,
                        })}
                    />
                }
                className='w-3/4 md:w-1/4 py-10'
            />

        </main>
    )
}

export default CustomerPage