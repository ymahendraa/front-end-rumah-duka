'use client'
import React, { useContext, useEffect } from 'react'

// components import
import Loading from '../../../components/atoms/loader/loading'
import Pagination from '@/components/organisms/pagination'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { DataTableBase } from '@/components/organisms/table/data-table'
import Modal from '@/components/atoms/modal'
import DeleteModalContent from '@/components/molecules/delete-modal-content'
import Section from '@/components/atoms/section'
// import InputDatepicker from '@/components/atoms/input/input-datepicker'
// import Button from '@/components/atoms/button'
// import InputText from '@/components/atoms/input/input-text'

// hooks import
import useColumns from './(features)/hooks/useColumns'
import { useGetDataWithPagination } from '@/hooks/useGetDataWithPagination'
import { usePaginationState } from '@/hooks/usePaginationState'
import { usePathname, useRouter } from 'next/navigation'
import useDebounce from '@/hooks/useDebounce'
import useSubmit from '@/hooks/useSubmit'

// utils import
import CRUDHeaderSection from '@/components/organisms/sections/crud-header-section'
import { AuthorizationContext } from '@/context/AuthorizationContext/context'
import { TODO } from '@/types/todo'
// import { checkPermissions } from '@/utils/checkPermissions'
import useSearchQuery from '@/hooks/useSearchQuery'

/**
 * 
 * @description
 * ReservasiPage: ReservasiPage component for showing almarhum data
 * @return ReservasiPage component
 */
const ReservasiPage = () => {
    const authData: TODO = useContext(AuthorizationContext) // get auth data from context
    const permissions = authData?.group?.permissions // get permissions from auth data

    // get the current route path
    const path = usePathname()

    // define router
    const router = useRouter()

    // call useSearchQuery
    const { inputValue, setInputValue, createQueryString } = useSearchQuery();

    // debounce the search input value
    const debouncedSearch = useDebounce(inputValue, 500);

    // update the URL when the debounced input value changes
    useEffect(() => {
        router.push(path + '?' + createQueryString('q', debouncedSearch));
    }, [debouncedSearch, createQueryString, path, router]);

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

    // define submit handler
    // get submit handler
    const { submitHandler, isLoading: isLoadingSubmit } = useSubmit()

    // get data from api
    const { data, isLoading, mutate } = useGetDataWithPagination({
        page,
        limit,
        filter: debouncedSearch,
        url: 'reservasi',
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
                    onClickCreate={() => router.push('reservasi/tambah-data')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disableCreate
                // disableCreate={!checkPermissions(['transaction.reservation.create'], permissions)}
                />
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

export default ReservasiPage