import React, { useEffect } from 'react'

// components import
import InputText from '@/components/atoms/input/input-text';
import Button from '@/components/atoms/button';
import Section from '@/components/atoms/section';
import Label from '@/components/atoms/label';
// import InputCheckbox from '@/components/atoms/input/input-checkbox';
// import { WrapperRadio } from '@/components/molecules/wrapper-radio';

// hooks import
import { SubmitHandler, useForm } from 'react-hook-form'
import useFetcher from '@/hooks/useFetcher';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

// utils import
// import { TODO } from '@/types/todo';
import useTransformObject from '@/hooks/useTransformObject';
import Loading from '@/components/atoms/loader/loading';
import { WrapperRadio } from '@/components/molecules/wrapper-radio';
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
    submitHandler,
    id,
    isLoading,
    setOpen,
    mutate,
    url
}) => {
    // define session
    const { data: session } = useSession();

    // define fetcher
    const fetcher = useFetcher(session);

    // get selected row data with SWR
    const { data: selectedData, error: errorSelectedData, isLoading: isLoadingData, isValidating } = useSWR(
        `${url}/${id}`,
        fetcher,
    )

    // get form data
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        watch,
    } = useForm();

    // reset form when data is fetched
    useEffect(() => {
        if (selectedData) {
            reset({
                username: selectedData?.username,
                email: selectedData?.email,
                nama_admin: selectedData?.nama_admin,
                role: selectedData?.role,
                // phone: selectedData?.phone,
                // password: selectedData?.password,
                active: selectedData?.active,
            })
        }

    }, [selectedData, reset]);
    // submit handler
    const onSubmit: SubmitHandler<any> = async (data: any) => {
        try {
            data.role = parseInt(data.role)
            // console.log(data)
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
                mutate,
            })
        } catch (error) {
            console.log(error)
        }
    }

    // reset form when modal is closed
    useEffect(() => {
        reset();
    }, [setOpen]);

    // get list of roles
    const { data: dataRoles, isLoading: isLoadingRoles, error: isErrorRoles } = useSWR(
        'authorization/user-role/all',
        fetcher
    )

    // useRouter
    const router = useRouter()

    // transform dataRoles 
    const transformedRoles = useTransformObject(dataRoles || [], 'id', 'role_name')

    // watch role
    // const watchRole = watch('role')

    if (isLoadingData || isValidating || !selectedData || isLoadingRoles) {
        return (
            <Loading />
        )
    }

    if (errorSelectedData || isErrorRoles) {
        return (
            <section data-testid="error-component">
                <p>Error</p>
            </section>
        )
    }

    return (
        <form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit(onSubmit)}>
            <Section className='w-full grid grid-cols-2 gap-4'>
                <InputText
                    type='text'
                    label='Username'
                    name='username'
                    register={register}
                    placeholder='Enter last name'
                    aria-required={true}
                    rule={{
                        required: {
                            value: true,
                            message: 'Username is required'
                        },
                    }}
                    error={errors.username}
                />

                <InputText
                    type='text'
                    label='Nama'
                    name='nama_admin'
                    register={register}
                    placeholder='Enter name'
                    aria-required={true}
                    rule={{
                        required: {
                            value: true,
                            message: 'Name is required'
                        },
                    }}
                    error={errors.nama_admin}
                />

                <InputText
                    type='email'
                    label='Email'
                    name='email'
                    register={register}
                    placeholder='Enter email'
                    aria-required={true}
                    rule={{
                        required: {
                            value: true,
                            message: 'Email is required'
                        },
                    }}
                    error={errors.email}
                />

                {/* <InputText
                    type='password'
                    label='Password'
                    name='password'
                    register={register}
                    placeholder='Enter password'
                    // aria-required={true}
                    // rule={{
                    //     required: {
                    //         value: true,
                    //         message: 'Password is required'
                    //     },
                    // }}
                    error={errors.password}
                />

                <InputText
                    type='password'
                    label='Confirm Password'
                    name='confirm_password'
                    register={register}
                    placeholder='Enter confirm password'
                    // aria-required={true}
                    rule={{
                        required: {
                            value: watch('password') ? true : false,
                            message: 'Confirm password is required'
                        },
                        validate: (value: any) => {
                            return value === watch('password') || 'Password does not match'
                        }
                    }}
                    error={errors.confirm_password}
                /> */}

                <Section>
                    <Label label="Status" name="active" />
                    <Section className='-mt-3'>
                        <WrapperRadio
                            name="active"
                            control={control}
                            options={[
                                { label: 'Active', value: 1 },
                                { label: 'Inactive', value: 0 },
                            ]}
                            defaultValue={1}
                        />
                    </Section>
                </Section>
            </Section>

            <Section
            >
                <Label label="Roles" name="role" aria-required={true} />
                <Section
                    className='flex flex-wrap gap-4'
                >

                    <Section className='-mt-3'>
                        <WrapperRadio
                            name="role"
                            control={control}
                            options={transformedRoles}
                            defaultValue={selectedData.role}
                        />
                    </Section>

                </Section>
                {errors.role && <p className='text-red-500 text-xs -mt-3'>{errors.role.message?.toString()}</p>}
            </Section>

            <Section
                data-testid='save-button'
                className='flex justify-end gap-4'
            >
                <Button
                    // type='submit'
                    type='button'
                    className='bg-red-500 hover:bg-red-600 rounded-lg text-white p-2 md:p-2 mt-2 text-xs md:text-sm'
                    onClick={() => router.push(`/authorization/users/detail/${id}/change-password`)}
                    disabled={isLoading}
                >
                    Ganti Password
                </Button>
                <Button
                    type='submit'
                    className='bg-secondary hover:bg-secondary-dark rounded-md text-white p-2 md:p-2 mt-2 text-xs md:text-sm'
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Simpan'}
                </Button>
            </Section>
        </form>
    )
}

export default Edit