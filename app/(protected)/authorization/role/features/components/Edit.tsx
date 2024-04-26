import React, { useEffect } from 'react'

// components import
import InputText from '@/components/atoms/input/input-text';
import Button from '@/components/atoms/button';
// import ComboBox from '@/components/molecules/combo-box';
// import InputIcon from '@/components/molecules/input-icon';
// import InputTextArea from '@/components/atoms/input/input-text-area';
import Section from '@/components/atoms/section';
import Label from '@/components/atoms/label';
import InputCheckbox from '@/components/atoms/input/input-checkbox';

// hooks import
// import useTransformObject from '@/hooks/useTransformObject';
import { SubmitHandler, useForm } from 'react-hook-form'
import useFetcher from '@/hooks/useFetcher';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

// utils import
// import { AUTHORIZATION_ACCESS } from '@/utils/dummy';
// import { ICON } from '@/utils/icon';
// import CheckboxWithChildren from '@/components/molecules/checkbox-with-children';
import { TODO } from '@/types/todo';
import useGroupPermissions from '@/hooks/useGroupPermissions';
import Loading from '@/components/atoms/loader/loading';
import useSubmit from '@/hooks/useSubmit';
import { useRouter } from 'next/navigation';

type EditProps = {
    submitHandler: (data: any) => void
    id: string | undefined | number
    isLoading: boolean
    setOpen: (open: boolean) => void
    mutate: () => void
    url: string
}

/**
 * @description
 * Edit : component for editing new menu
 * @param setOpen setOpen function for modal
 * @param mutate mutate function for data
 * @param url url for fetching data
 * @returns Edit component for editing new menu
 * 
 * @example
 * <Edit
 * setOpen={setOpen}
 * mutate={mutate}
 * url='customer'
 * />
 */
const Edit: React.FC<EditProps> = ({
    // submitHandler,
    id,
    isLoading,
    setOpen,
    // mutate,
    url
}) => {
    // define session
    const { data: session } = useSession();

    // define fetcher
    const fetcher = useFetcher(session);

    // get selected row data with SWR
    const { data: selectedData, error: errorSelectedData, isLoading: isLoadingData, isValidating } = useSWR(
        session ? `${url}/${id}` : null,
        fetcher,
    )

    // get form data
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // reset form when data is fetched
    useEffect(() => {
        if (selectedData) {
            reset({
                role_name: selectedData?.name,
                // description: selectedData?.description,
                permissions: selectedData?.group?.permissions?.map((item: any) => item), // CAUTION: change this to item.id if already you real API
                // actions: ['create', 'read', 'update', 'delete']
                // permissions: selectedData?.actions.map((item: any) => item.id.toString())
            })
        }

    }, [selectedData]);

    // get submit handler
    const { isLoading: isLoadingSubmit, submitHandler } = useSubmit()

    const router = useRouter()

    // submit handler
    const onSubmit: SubmitHandler<any> = async (data: any) => {
        try {
            console.log(JSON.stringify(data))
            submitHandler({
                url: `${url}/${id}`,
                config: {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                },
                setOpen,
                mutate: () => {
                    router.refresh()
                },
            })
            // refresh router
        } catch (error) {
            console.log(error)
        }
    }

    // reset form when modal is closed
    useEffect(() => {
        reset();
    }, [setOpen]);

    // get list of dataPermissions
    const { data: dataPermissions, isLoading: isLoadingPermissions, error: isErrorPermissions } = useSWR(
        session ? 'authorization/permissions' : null,
        fetcher
    )

    // transform dataPermissions
    const transformedPermission = useGroupPermissions(dataPermissions?.data ?? [])

    console.log('transformedPermission', transformedPermission)

    if (isLoading || isLoadingData || isValidating || !selectedData || isLoadingPermissions) {
        return (
            <Loading />
        )
    }

    if (errorSelectedData || isErrorPermissions) {
        return (
            <section data-testid="error-component">
                <p>Error</p>
            </section>
        )
    }

    return (
        <form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit(onSubmit)}>
            <InputText
                type='text'
                label='Nama'
                name='role_name'
                register={register}
                placeholder='Masukkan nama'
                aria-required={true}
                rule={{
                    required: {
                        value: true,
                        message: 'Nama wajib diisi'
                    },
                }}
                error={errors.role_name}
            />

            {/* <InputTextArea
                label='Deskripsi'
                name='description'
                placeholder='Masukkan deskripsi'
                register={register}
                rule={{
                    required: {
                        value: true,
                        message: 'Deskripsi wajib diisi'
                    },
                }}
                error={errors.description}
            /> */}

            <Section
            >
                <Label label="Permissions" name="permissions" />
                <Section
                    className='flex flex-wrap gap-2 -mt-3 '
                >
                    {
                        transformedPermission?.map((item: TODO, index: number) => (
                            <Section
                                key={index}
                                data-testid='authorization-access'
                                className='bg-base flex-1 p-2 rounded-md'
                            >
                                <p className='text-md text-white'>{item.name}</p>
                                {item.children && item.children.map((child: TODO, index: number) => (
                                    <InputCheckbox
                                        key={index}
                                        name='permissions'
                                        value={child.id}
                                        label={child.name}
                                        register={register}
                                    />
                                    // <p>{child.name}</p>
                                ))}
                            </Section>
                        ))
                    }
                </Section>
            </Section>

            <section
                data-testid='save-button'
            >
                <Button
                    type='submit'
                    className='bg-secondary hover:bg-secondary-dark rounded-md text-white w-full h-8 mt-2 text-sm'
                    disabled={isLoadingSubmit}
                >
                    {isLoadingSubmit ? 'Loading...' : 'Simpan'}
                </Button>
            </section>
        </form>
    )
}

export default Edit