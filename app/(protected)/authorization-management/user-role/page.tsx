'use client'

// components import
import CheckboxWithChildren from '@/components/molecules/checkbox-with-children'
import Section from '@/components/atoms/section'
import CRUDHeaderSection from '@/components/organisms/sections/crud-header-section'
import { DataTableBase } from '@/components/organisms/table/data-table'
import Pagination from '@/components/organisms/pagination'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Modal from '@/components/atoms/modal'
import DeleteModalContent from '@/components/molecules/delete-modal-content'
import Loading from '../../loading'
import Create from './features/components/Create'
import Edit from './features/components/Edit'

// hooks import
import { usePaginationState } from '@/hooks/usePaginationState'
import React, { useCallback, useContext } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useColumns from './features/hooks/useColumns'
import useModalState from '@/hooks/useModalState'
import useSubmit from '@/hooks/useSubmit'
import useDebounce from '@/hooks/useDebounce'
import { useGetDataWithPagination } from '@/hooks/useGetDataWithPagination'

// utils import
import { AuthorizationContext } from '@/context/AuthorizationContext/context'
import { checkPermissions } from '@/utils/checkPermissions'
import { TODO } from '@/types/todo'

/**
 * 
 * @description
 * RolePage: RolePage component for showing list of role
 * @return RolePage component
 */
const RolePage = () => {
    // const formattedPath = formatCurrentPath(path)

    // define search params
    const searchParams = useSearchParams()

    // define pathname
    const pathname = usePathname()

    // define router
    const router = useRouter()

    // get auth data from context
    const authData: TODO = useContext(AuthorizationContext)
    const permissions = authData?.group?.permissions

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
        url: 'authorization/user-role',
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
                    onClickCreate={() => setOpen(true)}
                    value={q}
                    disableCreate={!checkPermissions(['authorization.role.create'], permissions)}
                    onChange={(e) => {
                        router.push(pathname + '?' + createQueryString('q', e.target.value))
                    }}
                    advancedSearch={false}
                />
            </Section>
            <Section
                data-testid='group-menu-data'
            >
                <DataTableBase
                    columns={columns}
                    data={data}
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
                    dialogTitle='Create Role'
                    dialogContent={
                        <Create
                            mutate={mutate}
                            setOpen={setOpen}
                            url='authorization/user-role'
                        />
                    }
                    className='w-3/4 md:w-1/2'
                />
            </section>
            {/* modal edit */}
            <Modal
                isOpen={openEdit}
                setIsOpen={setOpenEdit}
                dialogTitle='Edit Role'
                dialogContent={
                    <Edit
                        id={selectedRow?.id}
                        submitHandler={submitHandler}
                        isLoading={isLoadingSubmit}
                        mutate={mutate}
                        setOpen={setOpenEdit}
                        url='authorization/user-role'
                    />
                }
                className='w-3/4 md:w-1/2'
            />
            {/* modal delete */}
            <Modal
                isOpen={openDelete}
                setIsOpen={setOpenDelete}
                dialogTitle='Delete Role'
                dialogContent={
                    <DeleteModalContent
                        name={selectedRow?.name}
                        setOpen={setOpenDelete}
                        isLoading={isLoadingSubmit}
                        deleteHandler={() => submitHandler({
                            url: `authorization/user-role/${selectedRow?.id}`,
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

export default RolePage