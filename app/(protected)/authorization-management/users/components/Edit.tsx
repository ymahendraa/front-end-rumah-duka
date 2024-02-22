import React, { useEffect } from 'react'

// components import
import InputText from '@/components/atoms/input/input-text';
import Button from '@/components/atoms/button';
import LoadingKalla from '@/components/atoms/loading';
import Section from '@/components/atoms/section';
import Label from '@/components/atoms/label';
import InputCheckbox from '@/components/atoms/input/input-checkbox';
import { WrapperRadio } from '@/components/molecules/WrapperRadio';

// hooks import
import { SubmitHandler, useForm } from 'react-hook-form'
import useFetcher from '@/hooks/useFetcher';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

// utils import
import { TODO } from '@/types/todo';
import useTransformObject from '@/hooks/useTransformObject';

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
                first_name: selectedData?.first_name,
                last_name: selectedData?.last_name,
                phone: selectedData?.phone,
                // password: selectedData?.password,
                role: selectedData?.role,
                status: selectedData?.status,
            })
        }

    }, [selectedData, reset]);
    // submit handler
    const onSubmit: SubmitHandler<any> = async (data: any) => {
        try {
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

    // transform dataRoles 
    const transformedRoles = useTransformObject(dataRoles || [])

    if (isLoadingData || isValidating || !selectedData || isLoadingRoles) {
        return (
            <section data-testid="loading-component" className='w-full flex items-center justify-center'>
                <LoadingKalla width={30} height={30} />
            </section>
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
                    label='First Name'
                    name='first_name'
                    register={register}
                    placeholder='Enter first name'
                    aria-required={true}
                    rule={{
                        required: {
                            value: true,
                            message: 'First name is required'
                        },
                    }}
                    error={errors.first_name}
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
                    type='text'
                    label='Last Name'
                    name='last_name'
                    register={register}
                    placeholder='Enter last name'
                />

                <InputText
                    type='text'
                    label='Phone'
                    name='phone'
                    register={register}
                    placeholder='Enter phone'
                />

                <InputText
                    type='password'
                    label='Password'
                    name='password'
                    register={register}
                    placeholder='Enter phone'
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
                    <Label label="Status" name="status" />
                    <Section className='-mt-3'>
                        <WrapperRadio
                            name="status"
                            control={control}
                            options={["active", "inactive"]}
                            defaultValue='active'
                        />
                    </Section>
                </Section>
            </Section>

            <Section
            >
                <Label label="Roles" name="role" aria-required={true} />
                <Section
                    className='flex flex-wrap gap-4 -mt-3 '
                >
                    {
                        transformedRoles?.map((item: TODO, index: number) => (
                            <Section
                                key={index}
                                data-testid='authorization-access'
                            >
                                <InputCheckbox
                                    key={index}
                                    name='role'
                                    value={item.label}
                                    label={item.label}
                                    register={register}
                                    rule={{
                                        required: {
                                            value: true,
                                            message: 'Role is required'
                                        },
                                    }}
                                />
                            </Section>
                        ))
                    }
                </Section>
                {errors.role && <p className='text-red-500 text-xs -mt-3'>{errors.role.message?.toString()}</p>}
            </Section>

            <section
                data-testid='save-button'
            >
                <Button
                    type='submit'
                    className='bg-primary hover:bg-primaryDark rounded-md text-white w-full h-8 mt-2 text-sm'
                >
                    {isLoading ? 'loading' : 'Save'}
                </Button>
            </section>
        </form>
    )
}

export default Edit