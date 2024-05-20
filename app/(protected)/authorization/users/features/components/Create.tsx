'use client'
import React, { useEffect } from 'react'

// components import
import InputText from '@/components/atoms/input/input-text';
import Button from '@/components/atoms/button';
// import InputCheckbox from '@/components/atoms/input/input-checkbox';
import Label from '@/components/atoms/label';
import Section from '@/components/atoms/section';

// hooks import
import { SubmitHandler, useForm } from 'react-hook-form'
import useSubmit from '@/hooks/useSubmit';
import useFetcher from '@/hooks/useFetcher';
import useSWR from 'swr';
import useTransformObject from '@/hooks/useTransformObject';
import { useSession } from 'next-auth/react';

// utils import
// import { TODO } from '@/types/todo';
import { WrapperRadio } from '@/components/molecules/wrapper-radio';
import Loading from '@/components/atoms/loader/loading';


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
    mutate,
    url
}) => {
    // define session
    const { data: session } = useSession()

    // get form data
    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors },
    } = useForm();

    // get submit handler
    const { submitHandler, isLoading } = useSubmit()

    // submit handler
    const onSubmit: SubmitHandler<any> = async (data: any) => {
        try {
            console.log(data)
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

    // define fetcher
    const fetcher = useFetcher(session);

    // get list of roles
    const { data: dataRoles, isLoading: isLoadingRoles, error: isErrorRoles } = useSWR(
        'authorization/user-role/all',
        fetcher
    )

    // transform dataRoles 
    const transformedRoles = useTransformObject(dataRoles || [], "id", "role_name")

    if (isLoadingRoles) {
        return (
            <Loading />
        )
    }

    if (isErrorRoles) {
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

                <InputText
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
                />

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
                        // defaultValue={selectedData.role}
                        />
                    </Section>

                </Section>
                {errors.role && <p className='text-red-500 text-xs -mt-3'>{errors.role.message?.toString()}</p>}
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