'use client'
import React, { useEffect } from 'react'

// components import
import InputText from '@/components/atoms/input/input-text';
import Button from '@/components/atoms/button';
import Section from '@/components/atoms/section';

// hooks import
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react';
import useFetcher from '@/hooks/useFetcher';
import useSWR from 'swr';
import { Almarhum } from '../types/Almarhum';
import Loading from '@/components/atoms/loader/loading';

/**
 * @description
 * Detail : component for detail existing customer
 * 
 * @returns Detail component for detail existing customer
 */

type DetailProps = {
    id: string
}

const Detail: React.FC<DetailProps> = ({
    id
}) => {

    // get form data
    const {
        register,
        // handleSubmit,
        reset
    } = useForm<Almarhum>();

    // define session
    const { data: session } = useSession()

    // // get submit handler
    // const { submitHandler, isLoading } = useSubmit()

    // // define submit handler

    // // submit handler
    // const onSubmit: SubmitHandler<any> = async (data: any) => {
    //     try {
    //         console.log(data)
    //         // await submitHandler({
    //         //     url: 'customer',
    //         //     config: {
    //         //         method: 'POST',
    //         //         headers: {
    //         //             'Content-Type': 'application/json'
    //         //         },
    //         //         body: JSON.stringify(data),
    //         //     },
    //         //     setOpen: () => { },
    //         //     mutate: () => { },
    //         // })
    //     } catch (error) {
    //         console.log(error)
    //     }

    // }

    // define fetcher
    const fetcher = useFetcher(session);

    // get list current ruangan
    const { data, isLoading: loadingData, error } = useSWR(
        `almarhum/${id}`,
        fetcher
    )

    // reset form when data is fetched
    useEffect(() => {
        if (data) {
            reset({
                nama_lengkap: data.data.nama_lengkap,
                diagnosa: data.data.diagnosa,
                jenis_kelamin: data.data.jenis_kelamin,
                umur: data.data.umur,
                alamat: data.data.alamat,
                pekerjaan: data.data.pekerjaan,
                tempat_meninggal: data.data.tempat_meninggal,
                tgl_waktu_meninggal: data.data.tgl_waktu_meninggal,
            })
        }
    }, [data]);

    if (loadingData) return <div><Loading /></div>

    if (error) return <div>Error...</div>

    return (
        <form className='flex flex-col gap-8 w-full'>
            {/* FIRST SECTION */}
            <Section className='grid md:grid-cols-2 bg-primary rounded-lg px-4 pb-10 pt-4 gap-x-8 gap-y-4'>
                <InputText
                    type='text'
                    aria-required
                    label='Nama Lengkap'
                    name='nama_lengkap'
                    disabled
                    // placeholder='Cth: 3174xxxxxxxxxxx8889'
                    register={register}
                />

                <InputText
                    type='text'
                    aria-required
                    label='Jenis Kelamin'
                    name='jenis_kelamin'
                    disabled
                    // placeholder='Cth:  Alwy Raihan maks(40)'
                    register={register}
                />

                <InputText
                    type='text'
                    aria-required
                    label='Alamat'
                    name='alamat'
                    disabled
                    // placeholder='Cth:  Alwy Raihan maks(40)'
                    register={register}
                />

                <InputText
                    type='text'
                    aria-required
                    label='Umur'
                    name='umur'
                    disabled
                    // placeholder='Cth: ASN'
                    register={register}
                />

                <InputText
                    type='text'
                    aria-required
                    label='Pekerjaan'
                    name='pekerjaan'
                    disabled
                    // placeholder='Cth: ASN'
                    register={register}
                />

                <InputText
                    type='text'
                    aria-required
                    label='Diagnosa'
                    name='diagnosa'
                    disabled
                    // placeholder='Cth: ASN'
                    register={register}
                />

                <InputText
                    type='text'
                    aria-required
                    label='Diagnosa'
                    name='diagnosa'
                    disabled
                    // placeholder='Cth: ASN'
                    register={register}
                />

                <InputText
                    type='text'
                    aria-required
                    label='Tempat Meninggal'
                    name='tempat_meninggal'
                    disabled
                    // placeholder='Cth: ASN'
                    register={register}
                />

                <InputText
                    type='text'
                    // aria-required
                    label='Tanggal Meninggal'
                    name='tgl_waktu_meninggal'
                    disabled
                    // placeholder='Cth: ASN'
                    register={register}
                />


            </Section>

            <Section
                data-testid='save-button'
                className='flex justify-end gap-4'
            >
                {/* <Button
                    type='submit'
                    className='bg-secondary hover:bg-secondary-dark rounded-lg text-white w-32 p-3 mt-2 text-sm'
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Simpan'}
                </Button> */}
                <Button
                    type='submit'
                    className='bg-red-500 hover:bg-red-600 rounded-lg text-white w-32 p-3 mt-2 text-sm'
                // disabled={isLoading}
                >
                    {'Kembali'}
                </Button>
            </Section>
        </form>
    )
}

export default Detail