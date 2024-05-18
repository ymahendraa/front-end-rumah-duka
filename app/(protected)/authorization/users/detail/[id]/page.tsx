'use client'
import React, { useEffect } from 'react'

// components import
import InputText from '@/components/atoms/input/input-text';
import Button from '@/components/atoms/button';
// import FileInput from '@/components/molecules/file-input';
import Section from '@/components/atoms/section';
import ComboBox from '@/components/molecules/combo-box';

// hooks import
import { SubmitHandler, useForm } from 'react-hook-form'
import useSubmit from '@/hooks/useSubmit';
import { useRouter } from 'next/navigation';
// import useFetcher from '@/hooks/useFetcher';
// import { useSession } from 'next-auth/react';
// import useTransformObject from '@/hooks/useTransformObject';
// import useSWR from 'swr';
import { ROOM_CATEGORY } from '@/utils/const/room-category';
import useFetcher from '@/hooks/useFetcher';
import useSWR from 'swr';
import Loading from '@/components/atoms/loader/loading';
import { useSession } from 'next-auth/react';
import { Ruangan } from '@/app/(protected)/ruangan/(features)/types/Ruangan';
import { User } from '@/types/user';
// import Loading from '@/components/atoms/loader/loading';

// utils import

/**
 * @description
 * DetailUser : page for showing detail user
 * @returns DetailUser component for showing detail user
 */

const DetailUser = ({ params }: { params: { id: string } }) => {
    // define session
    const { data: session } = useSession()

    // get form data
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        reset
    } = useForm<User & { password_confirmation: string }>();

    // define router
    const router = useRouter()

    // get submit handler
    const { submitHandler, isLoading } = useSubmit()

    // submit handler
    const onSubmit: SubmitHandler<any> = async (data: any) => {
        try {
            // console.log(data)
            await submitHandler({
                url: `authorization/profile/${params.id}`,
                config: {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                },
                setOpen: () => { },
                mutate: router.back,
            })
        } catch (error) {
            console.log(error)
        }
    }

    // define fetcher
    const fetcher = useFetcher(session);

    // get list current ruangan
    const { data, isLoading: loadingData, error } = useSWR(
        `authorization/profile/${params.id}`,
        fetcher
    )

    // reset form when data is fetched
    useEffect(() => {
        if (data) {
            reset({
                role: data?.role_name,
                username: data.username,
                nama_admin: data.nama_admin,
                email: data.email,
            })
        }
    }, [data, reset]);

    if (loadingData || !data) {
        return (
            <Loading />
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
        <form className='flex flex-col gap-8 w-full' onSubmit={handleSubmit(onSubmit)}>
            {/* FIRST SECTION */}
            <Section className='grid md:grid-cols-2 bg-primary rounded-lg px-4 pb-10 pt-4 gap-x-8 gap-y-4'>
                <InputText
                    // aria-required
                    label='Role'
                    name='role'
                    type='text'
                    placeholder='Role'
                    register={register}
                    // readOnly
                    disabled
                />

                <InputText
                    type='text'
                    aria-required
                    label='Nama'
                    name='nama_admin'
                    placeholder='Nama'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Nama wajib diisi'
                        }
                    }}
                    error={errors.password_confirmation}
                />

            </Section>

            {/* SECOND SECTION */}
            <Section className='grid md:grid-cols-2 bg-primary rounded-lg px-4 pb-10 pt-4 gap-x-8 gap-y-4'>
                <InputText
                    aria-required
                    label='Email'
                    name='email'
                    type='email'
                    placeholder='Email'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Email wajib diisi'
                        }
                    }}
                    error={errors.email}
                />

                <InputText
                    type='text'
                    aria-required
                    label='Username'
                    name='username'
                    placeholder='Username'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Username wajib diisi'
                        }
                    }}
                    error={errors.username}
                />

            </Section>

            <Section
                data-testid='save-button'
                className='flex justify-end gap-4'
            >

                <Button
                    // type='submit'
                    type='button'
                    className='bg-red-500 hover:bg-red-600 rounded-lg text-white p-2 md:p-2 w-32 mt-2 text-xs md:text-sm'
                    onClick={() => router.push(`/authorization/users/detail/${params.id}/change-password`)}
                    disabled={isLoading}
                >
                    Ganti Password
                </Button>
                <Button
                    // type='submit'
                    type='button'
                    className='border border-red-500 text-white w-32 mt-2 rounded-lg text-xs md:text-sm'
                    onClick={() => router.back()}
                    disabled={isLoading}
                >
                    Kembali
                </Button>
                <Button
                    type='submit'
                    className='bg-secondary hover:bg-secondary-dark rounded-lg text-white w-32 mt-2 text-xs md:text-sm'
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Simpan'}
                </Button>
            </Section>
        </form>
    )
}

export default DetailUser