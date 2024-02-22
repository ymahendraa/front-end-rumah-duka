import React, { useEffect } from 'react'

// components import
import InputText from '@/components/atoms/input/input-text';
import Button from '@/components/atoms/button';
import LoadingKalla from '@/components/atoms/loading';

// hooks import
import { SubmitHandler, useForm } from 'react-hook-form'
import useSWR from 'swr';
import useFetcher from '@/hooks/useFetcher';
import { useSession } from 'next-auth/react';

type EditProps = {
    submitHandler: (data: any) => void
    id: string | undefined
    isLoading: boolean
    setOpen: (open: boolean) => void
    mutate: () => void
    url: string
}
/**
 * @description
 * Edit : component for creating new customer
 * @param setOpen setOpen function for modal
 * @param mutate mutate function for data
 * @param url url for fetching data
 * @returns Edit component for creating new customer
 * 
 * @example
 * <Edit
 * setOpen={setOpen}
 * mutate={mutate}
 * url='customers'
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
    // get session data
    const { data: session } = useSession()
    // define fetcher
    const fetcher = useFetcher(session)
    // get selected row data with SWR
    const { data, error, isLoading: isLoadingData, isValidating } = useSWR(
        session ? `${url}/${id}` : null,
        fetcher,
    )

    // get form data
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (data) {
            reset({
                first_name: data?.first_name,
                last_name: data?.last_name,
                email: data?.email,
            })
        }

    }, [data, reset]);

    // submit handler
    const onSubmit: SubmitHandler<any> = async (data: any) => {
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
    }

    if (isLoadingData || isValidating) {
        return (
            <section data-testid="loading-edit" className='w-full flex items-center justify-center'>
                <LoadingKalla width={30} height={30} />
            </section>
        )
    }

    if (error) {
        return <div className='text-black'>
            {error.message}
        </div>
    }

    return (
        <form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit(onSubmit)}>
            <InputText
                type='text'
                required
                label='First Name'
                name='first_name'
                placeholder='Enter first name'
                register={register}
                rule={{
                    required: {
                        value: true,
                        message: 'First name is required'
                    },
                }}
                error={errors.first_name}
            />

            <InputText
                type='text'
                required
                label='Last Name'
                name='last_name'
                placeholder='Enter last name'
                register={register}
                rule={{
                    required: {
                        value: true,
                        message: 'Last name is required'
                    },
                }}
                error={errors.last_name}
            />

            <InputText
                type='text'
                required
                label='Email'
                name='email'
                placeholder='Enter email'
                register={register}
                rule={{
                    required: {
                        value: true,
                        message: 'Email is required'
                    },
                    pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        message: 'Email is not valid'
                    }
                }}
                error={errors.email}
            />

            <Button
                type='submit'
                className='bg-primary hover:bg-primaryDark rounded-md text-white w-full h-8 mt-2 text-sm'
            >
                {isLoading ? 'loading' : 'Save'}
            </Button>
        </form>
    )
}

export default Edit