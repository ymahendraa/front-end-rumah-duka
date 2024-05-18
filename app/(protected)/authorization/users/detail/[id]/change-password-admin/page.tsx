'use client'
import React from 'react'

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
// import { ROOM_CATEGORY } from '@/utils/const/room-category';
// import Loading from '@/components/atoms/loader/loading';

// utils import

/**
 * @description
 * ChangePasswordPage : change password page
 * @returns ChangePasswordPage component for changing password
 */
const ChangePasswordPage = ({ params }: { params: { id: string } }) => {
    // define session
    // const { data: session } = useSession()


    // get form data
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm();

    // define router
    const router = useRouter()

    // get submit handler
    const { submitHandler, isLoading } = useSubmit()

    // submit handler
    const onSubmit: SubmitHandler<any> = async (data: any) => {
        try {
            // console.log(data)
            await submitHandler({
                url: `authorization/reset-password/${params.id}`,
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

    return (
        <form className='flex flex-col gap-8 w-full' onSubmit={handleSubmit(onSubmit)}>
            {/* FIRST SECTION */}
            <Section className='grid md:grid-cols-2 bg-primary rounded-lg px-4 pb-10 pt-4 gap-x-8 gap-y-4'>
                <InputText
                    aria-required
                    label='Password Baru'
                    name='password'
                    type='password'
                    placeholder='Password Baru'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Password wajib diisi'
                        }
                    }}
                    error={errors.password}
                />

                <InputText
                    type='password'
                    aria-required
                    label='Konfirmasi Password Baru'
                    name='password_confirmation'
                    placeholder='Konfirmasi Password Baru'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Konfirmasi Password wajib diisi'
                        },
                        validate: (value: any) => value === getValues('password') || 'Password do not match'

                    }}
                    error={errors.password_confirmation}
                />

            </Section>

            <Section
                data-testid='save-button'
                className='flex justify-end gap-4'
            >
                <Button
                    type='submit'
                    className='bg-secondary hover:bg-secondary-dark rounded-lg text-white p-2 md:p-2 w-32 mt-2 text-xs md:text-sm'
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Simpan'}
                </Button>
                <Button
                    // type='submit'
                    type='button'
                    className='bg-red-500 hover:bg-red-600 rounded-lg text-white p-2 md:p-2 w-32 mt-2 text-xs md:text-sm'
                    onClick={() => router.back()}
                    disabled={isLoading}
                >
                    Kembali
                </Button>
            </Section>
        </form>
    )
}

export default ChangePasswordPage