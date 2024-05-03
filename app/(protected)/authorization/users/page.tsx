'use client'

// components import
// import CheckboxWithChildren from '@/components/molecules/checkbox-with-children'
import Section from '@/components/atoms/section'
import CRUDHeaderSection from '@/components/organisms/sections/crud-header-section'
import { DataTableBase } from '@/components/organisms/table/data-table'
import Pagination from '@/components/organisms/pagination'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Modal from '@/components/atoms/modal'
import DeleteModalContent from '@/components/molecules/delete-modal-content'
import Loading from '../../../../components/atoms/loader/loading'
import Create from './features/components/Create'
import Edit from './features/components/Edit'

// hooks import
import { usePaginationState } from '@/hooks/usePaginationState'
import React, { useContext, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import useColumns from './features/hooks/useColumns'
import useModalState from '@/hooks/useModalState'
import useSubmit from '@/hooks/useSubmit'
import useDebounce from '@/hooks/useDebounce'
import { useGetDataWithPagination } from '@/hooks/useGetDataWithPagination'
import { TODO } from '@/types/todo'
import { AuthorizationContext } from '@/context/AuthorizationContext/context'
import useSearchQuery from '@/hooks/useSearchQuery'
import { checkPermissions } from '@/utils/checkPermissions'

/**
 * 
 * @description
 * UsersPage: UsersPage component for showing list of role
 * @return UsersPage component
 */
const UsersPage = () => {
    // const formattedPath = formatCurrentPath(path)

    // define pathname
    const path = usePathname()

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

    // call useSearchQuery
    const { inputValue, setInputValue, createQueryString } = useSearchQuery();

    // debounce the search input value
    const debouncedSearch = useDebounce(inputValue, 500);

    // update the URL when the debounced input value changes
    useEffect(() => {
        router.push(path + '?' + createQueryString('q', debouncedSearch));
    }, [debouncedSearch, createQueryString, path, router]);

    // get data from api
    const { data, isLoading, mutate, error } = useGetDataWithPagination({
        page,
        limit,
        filter: debouncedSearch,
        url: 'authorization/users',
        // accessToken,
    })

    if (isLoading || !data) {
        return (
            <section data-testid="loading-component">
                <Loading />
            </section>
        )
    }

    if (error) {
        return (
            <section data-testid="error-component">
                <p>Error</p>
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
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    advancedSearch={false}
                    disableCreate={!checkPermissions(['authorization.users.create'], permissions)}
                />
            </Section>
            <Section
                data-testid='group-menu-data'
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
                            url='authorization/users'
                        />
                    }
                    className='w-3/4 md:w-1/2'
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
                        url='authorization/users'
                    />
                }
                className='w-3/4 md:w-1/2'
            />
            {/* modal delete */}
            <Modal
                isOpen={openDelete}
                setIsOpen={setOpenDelete}
                dialogTitle='Delete User'
                dialogContent={
                    <DeleteModalContent
                        name={selectedRow?.name}
                        setOpen={setOpenDelete}
                        isLoading={isLoadingSubmit}
                        deleteHandler={() => submitHandler({
                            url: `authorization/users/${selectedRow?.id}`,
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

export default UsersPage