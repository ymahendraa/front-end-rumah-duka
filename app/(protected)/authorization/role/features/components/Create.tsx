import React, { useEffect } from 'react'

// components import
import InputText from '@/components/atoms/input/input-text';
import Button from '@/components/atoms/button';
// import ComboBox from '@/components/molecules/combo-box';
// import InputIcon from '@/components/molecules/input-icon';
// import { ICON } from '@/utils/icon';
import InputTextArea from '@/components/atoms/input/input-text-area';
import InputCheckbox from '@/components/atoms/input/input-checkbox';
import Label from '@/components/atoms/label';
import Section from '@/components/atoms/section';

// hooks import
import { SubmitHandler, useForm } from 'react-hook-form'
import useSubmit from '@/hooks/useSubmit';
import useFetcher from '@/hooks/useFetcher';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

// utils import
import useGroupPermissions from '@/hooks/useGroupPermissions';
import { TODO } from '@/types/todo';
import Loading from '@/components/atoms/loader/loading';
import { useRouter } from 'next/navigation';


type CreateProps = {
    setOpen: (open: boolean) => void
    mutate: () => void
    url: string
}

/**
 * @description
 * Create : component for creating new menu
 * @param setOpen setOpen function for modal
 * @param mutate mutate function for data
 * @param url url for fetching data
 * @returns Create component for creating new menu
 * 
 * @example
 * <Create
 * setOpen={setOpen}
 * mutate={mutate}
 * url='customer'
 * />
 */
const Create: React.FC<CreateProps> = ({
    setOpen,
    // mutate,
    url
}) => {
    // define session
    const { data: session } = useSession()

    // get form data
    const {
        register,
        handleSubmit,
        // control,
        reset,
        formState: { errors },
    } = useForm();

    // get submit handler
    const { isLoading, submitHandler } = useSubmit()

    // define router
    const router = useRouter()

    // submit handler
    const onSubmit: SubmitHandler<any> = async (data: any) => {
        try {
            console.log(JSON.stringify(data))
            await submitHandler({
                url: url,
                config: {
                    method: 'POST',
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
        } catch (error) {
            console.log(error)
        }
    }

    // reset form when modal is closed
    useEffect(() => {
        reset();
    }, [setOpen, reset]);

    // define fetcher
    const fetcher = useFetcher(session);

    // get list of permissions
    const { data: dataPermissions, isLoading: isLoadingPermissions, error: isErrorPermissions } = useSWR(
        session ? 'authorization/permissions' : null,
        fetcher
    )

    // transform dataPermissions
    const transformedPermission = useGroupPermissions(dataPermissions?.data ?? [])


    console.log('dataPermissions', dataPermissions)
    console.log('transformedPermission', transformedPermission)

    if (isLoadingPermissions || !transformedPermission || !dataPermissions) {
        return (
            <Loading />
        )
    }

    if (isErrorPermissions) {
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
                        transformedPermission && transformedPermission?.map((item: TODO, index: number) => (
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
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Simpan'}
                </Button>
            </section>
        </form>
    )
}

export default Create