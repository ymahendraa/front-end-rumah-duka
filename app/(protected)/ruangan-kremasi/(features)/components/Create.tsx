'use client'
import React from 'react'

// components import
import InputText from '@/components/atoms/input/input-text';
import Button from '@/components/atoms/button';
import FileInput from '@/components/molecules/file-input';
import Section from '@/components/atoms/section';
import ComboBox from '@/components/molecules/combo-box';
import LoadingKalla from '@/components/atoms/loading';

// hooks import
import { SubmitHandler, useForm } from 'react-hook-form'
import useSubmit from '@/hooks/useSubmit';
import { useRouter } from 'next/navigation';
import useFetcher from '@/hooks/useFetcher';
import { useSession } from 'next-auth/react';
import useTransformObject from '@/hooks/useTransformObject';
import useSWR from 'swr';
import { ROOM_CATEGORY } from '@/utils/const/room-category';
import Loading from '@/components/atoms/loader/loading';

// utils import

/**
 * @description
 * Create : component for creating new customer
 *
 * @returns Create component for creating new customer
 */
const Create: React.FC = () => {
    // define session
    const { data: session } = useSession()


    // get form data
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm();

    // define router
    const router = useRouter()

    // get submit handler
    const { submitHandler, isLoading } = useSubmit()

    // submit handler
    const onSubmit: SubmitHandler<any> = async (data: any) => {
        try {
            console.log(data)
            await submitHandler({
                url: 'ruangan-kremasi',
                config: {
                    method: 'POST',
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
    // const fetcher = useFetcher(session);

    // // get list of ruangan
    // const { data: dataRuangan, isLoading: isLoadingRuangan, error: erroRuangan } = useSWR(
    //     'ruangan?page=1&limit=100',
    //     fetcher
    // )

    // transform dataRuangan 
    // const transformedRuangan = useTransformObject(dataRuangan || [], 'id', 'no_ruangan')

    // if (isLoadingRuangan || !dataRuangan) {
    //     return (
    //         <section data-testid="loading-component" className='flex justify-center'>
    //             <LoadingKalla width={30} height={30} />
    //         </section>
    //     )
    // }

    // if (erroRuangan) {
    //     return (
    //         <section data-testid="error-component">
    //             <p>Error</p>
    //         </section>
    //     )
    // }

    return (
        <form className='flex flex-col gap-8 w-full' onSubmit={handleSubmit(onSubmit)}>
            {/* FIRST SECTION */}
            <Section className='grid md:grid-cols-2 bg-primary rounded-lg px-4 pb-10 pt-4 gap-x-8 gap-y-4'>
                <InputText
                    aria-required
                    label='Nomor Ruangan'
                    name='no_ruangan'
                    placeholder='Cth: 001'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Nomor Ruangan wajib diisi'
                        }
                    }}
                    error={errors.no_ruangan}
                />


                <ComboBox
                    required
                    label='Kategori'
                    name='category_room'
                    rule={{
                        required: {
                            value: true,
                            message: 'Kategori wajib diisi'
                        }
                    }}
                    options={ROOM_CATEGORY}
                    control={control}
                    error={errors.category_room}
                />

                <InputText
                    aria-required
                    type="time"
                    label='Jadwal'
                    name='jadwal'
                    placeholder='Cth:08.00'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Jadwal wajib diisi'
                        }
                    }}
                    error={errors.jadwal}
                />

                <InputText
                    type='number'
                    aria-required
                    label='Harga'
                    name='harga'
                    placeholder='Cth: 1000000'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Harga wajib diisi'
                        }
                    }}
                    error={errors.harga}
                />

            </Section>

            <Section
                data-testid='save-button'
                className='flex justify-end gap-4'
            >
                <Button
                    type='submit'
                    className='bg-secondary hover:bg-secondary-dark rounded-lg text-white w-32 p-3 mt-2 text-sm'
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Simpan'}
                </Button>
                <Button
                    // type='submit'
                    type='button'
                    className='bg-red-500 hover:bg-red-600 rounded-lg text-white w-32 p-3 mt-2 text-sm'
                    onClick={() => router.back()}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Kembali'}
                </Button>
            </Section>
        </form>
    )
}

export default Create