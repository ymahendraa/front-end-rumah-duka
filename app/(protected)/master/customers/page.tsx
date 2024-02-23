'use client'
import React, { useCallback, useContext } from 'react'

// components import
import Loading from '../../loading'
import Pagination from '@/components/organisms/pagination'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { DataTableBase } from '@/components/organisms/table/data-table'
import Modal from '@/components/atoms/modal'
import Create from './component/Create'
import Edit from './component/Edit'
import DeleteModalContent from '@/components/molecules/delete-modal-content'
import Section from '@/components/atoms/section'
import InputDatepicker from '@/components/atoms/input/input-datepicker'
import Button from '@/components/atoms/button'
import InputText from '@/components/atoms/input/input-text'

// hooks import
import useColumns from './hooks/useColumns'
import { useGetDataWithPagination } from '@/hooks/useGetDataWithPagination'
import { usePaginationState } from '@/hooks/usePaginationState'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import useModalState from '@/hooks/useModalState'
import useDebounce from '@/hooks/useDebounce'
import useSubmit from '@/hooks/useSubmit'

// utils import
import formatCurrentPath from '@/utils/formatCurrentPath'
import CRUDHeaderSection from '@/components/organisms/sections/crud-header-section'
import { AuthorizationContext } from '@/context/AuthorizationContext/context'
import { TODO } from '@/types/todo'
import { checkPermissions } from '@/utils/checkPermissions'

/**
 * 
 * @description
 * CustomerPage: CustomerPage component for showing user data
 * @return CustomerPage component
 */
const CustomerPage = () => {
    // get the current route path
    const path = usePathname()
    const formattedPath = formatCurrentPath(path)

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
        openEdit,
        openDelete,
        setOpenEdit,
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
            <h1 className='text-2xl text-black'>{formattedPath}</h1>
            <Section
                data-testid='create-button'
            >
                <CRUDHeaderSection
                    onClickCreate={() => setOpen(true)}
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
                                className='bg-primary text-white rounded-md p-1 hover:bg-primaryDark text-sm'
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
            >
                <DataTableBase
                    columns={columns}
                    data={Array.isArray(data) ? data : []}
                />
            </Section>
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
            {/* modal create */}
            <section data-testid='create-modal'>
                <Modal
                    isOpen={open}
                    setIsOpen={setOpen}
                    dialogTitle='Create User'
                    dialogContent={
                        <Create
                            mutate={mutate}
                            setOpen={setOpen}
                            url='master/customers'
                        />
                    }
                    className='w-3/4 md:w-1/3'
                />
            </section>
            {/* modal edit */}
            <Modal
                isOpen={openEdit}
                setIsOpen={setOpenEdit}
                dialogTitle='Edit User'
                dialogContent={
                    <Edit
                        id={selectedRow?.id}
                        submitHandler={submitHandler}
                        isLoading={isLoadingSubmit}
                        mutate={mutate}
                        setOpen={setOpenEdit}
                        url='master/customers'
                    />
                }
                className='w-3/4 md:w-1/3'
            />
            {/* modal delete */}
            <Modal
                isOpen={openDelete}
                setIsOpen={setOpenDelete}
                dialogTitle='Edit User'
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
                className='w-3/4 md:w-1/3'
            />

        </main>
    )
}

export default CustomerPage