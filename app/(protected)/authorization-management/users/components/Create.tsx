import React, { useEffect } from 'react'

// components import
import InputText from '@/components/atoms/input/input-text';
import Button from '@/components/atoms/button';
import LoadingKalla from '@/components/atoms/loading';
import InputCheckbox from '@/components/atoms/input/input-checkbox';
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
import { TODO } from '@/types/todo';
import { WrapperRadio } from '@/components/molecules/WrapperRadio';


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
    const transformedRoles = useTransformObject(dataRoles || [])

    if (isLoadingRoles) {
        return (
            <section data-testid="loading-component" className='flex justify-center'>
                <LoadingKalla width={30} height={30} />
            </section>
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
                    aria-required={true}
                    rule={{
                        required: {
                            value: true,
                            message: 'Password is required'
                        },
                    }}
                    error={errors.password}
                />

                <InputText
                    type='password'
                    label='Confirm Password'
                    name='confirm_password'
                    register={register}
                    placeholder='Enter phone'
                    aria-required={true}
                    rule={{
                        required: {
                            value: true,
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

export default Create