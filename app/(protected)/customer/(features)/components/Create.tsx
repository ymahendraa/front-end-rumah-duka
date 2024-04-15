'use client'
import React from 'react'

// components import
import InputText from '@/components/atoms/input/input-text';
import Button from '@/components/atoms/button';
import FileInput from '@/components/molecules/file-input';
import Section from '@/components/atoms/section';
import ComboBox from '@/components/molecules/combo-box';
import InputDatepicker from '@/components/atoms/input/input-datepicker';

// hooks import
import { SubmitHandler, useForm } from 'react-hook-form'
import useSubmit from '@/hooks/useSubmit';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import useFetcher from '@/hooks/useFetcher';
import { useSession } from 'next-auth/react';

// utils import
import { fileToBase64 } from '@/utils/convertToBase64';
import { SendCustomer } from '../types/Customer';
import useTransformObject from '@/hooks/useTransformObject';
import Loading from '@/components/atoms/loader/loading';


/**
 * @description
 * Create : component for creating new customer
 * @todo adjust the status
 *
 * @returns Create component for creating new customer
 */
const Create: React.FC = () => {

    // get form data
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm<SendCustomer>(
        {
            defaultValues: {
                nik: '',
                nama_lengkap_pemohon: '',
                hub_almarhum: '',
                jenis_pekerjaan: '',
                nama_lengkap_almarhum: '',
                umur: '',
                alamat: '',
                riwayat_pekerjaan: '',
                alamat_almarhum: '',
                diagnosa: '',
                tgl_waktu_meninggal: '',
                tempat_meninggal: '',
                document: undefined,
                no_room: '',
                no_kremasi: '',
                // screenshot: undefined,
                // status: '',
                reservation_date: ''
            }
        }
    );

    // define session
    const { data: session } = useSession()

    // define fetcher
    const fetcher = useFetcher(session);

    // define router
    const router = useRouter()

    // get submit handler
    const { submitHandler, isLoading } = useSubmit()

    // submit handler
    const onSubmit: SubmitHandler<any> = async (data: any) => {
        try {
            if (data.document) {
                data.document = await fileToBase64(data.document);
            }
            console.log(data)
            // await submitHandler({
            //     url: 'customer',
            //     config: {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify(data),
            //     },
            //     setOpen: () => { },
            //     mutate: () => { },
            // })
        } catch (error) {
            console.log(error)
        }

    }

    // get list of room
    const { data: dataRoom, isLoading: loadingRoom, error: errorRoom } = useSWR(
        session ? `ruangan?page=1&limit=1000` : null,
        fetcher
    )

    // transform room data
    const transformedRoom = useTransformObject(dataRoom?.data ?? [], 'id', 'no_ruangan')

    // get list of ruangan_kremasi
    const { data: dataKremasi, isLoading: loadingKremasi, error: errorKremasi } = useSWR(
        session ? `ruangan-kremasi?page=1&limit=1000` : null,
        fetcher
    )

    // transform ruangan_kremasi data
    const transformedKremasi = useTransformObject(dataKremasi?.data ?? [], 'id', 'no_ruangan')

    if (loadingRoom || loadingKremasi || !dataKremasi || !dataRoom) return <div>
        <Loading />
    </div>

    if (errorKremasi || errorRoom) return <div>Error...</div>

    return (
        <form className='flex flex-col gap-8 w-full' onSubmit={handleSubmit(onSubmit)}>
            {/* FIRST SECTION */}
            <Section className='grid md:grid-cols-2 bg-primary rounded-lg px-4 pb-10 pt-4 gap-x-8 gap-y-4'>
                <InputText
                    type='text'
                    aria-required
                    label='NIK'
                    name='nik'
                    placeholder='Cth: 3174xxxxxxxxxxx8889'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'NIK wajib diisi'
                        },
                    }}
                    error={errors.nik}
                />

                <InputText
                    type='text'
                    aria-required
                    label='Nama Lengkap (Sesuai KTP)'
                    name='nama_lengkap_pemohon'
                    placeholder='Cth:  Alwy Raihan maks(40)'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Nama Lengkap wajib diisi'
                        },
                        maxLength: {
                            value: 40,
                            message: 'Nama Lengkap maksimal 40 karakter'
                        }
                    }}
                    error={errors.nama_lengkap_pemohon}
                />

                <ComboBox
                    required
                    aria-required
                    label='Hubungan Keluarga'
                    name='hub_almarhum'
                    rule={{
                        required: {
                            value: true,
                            message: 'Hubungan Keluarga wajib diisi'
                        }
                    }}
                    options={[
                        { value: 'Keluarga', label: 'Keluarga' },
                        { value: 'Saudara', label: 'Saudara' },
                        { value: 'Teman', label: 'Teman' },
                    ]}
                    control={control}
                    error={errors.hub_almarhum}
                />

                <InputText
                    type='text'
                    aria-required
                    label='Jenis Pekerjaan Customer'
                    name='jenis_pekerjaan'
                    placeholder='Cth: ASN'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Jenis Pekerjaan wajib diisi'
                        },
                    }}
                    error={errors.jenis_pekerjaan}
                />

                <InputText
                    type='text'
                    aria-required
                    label='Alamat Lengkap'
                    name='alamat'
                    placeholder='Cth: Jl. Raya Cilangkap No. 10'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Alamat Lengkap wajib diisi'
                        },
                    }}
                    error={errors.alamat}
                />
            </Section>

            {/* SECOND SECTION */}
            <Section className='grid md:grid-cols-2 bg-primary rounded-lg px-4 pb-10 pt-4 gap-x-8 gap-y-4'>
                <InputText
                    type='text'
                    aria-required
                    label='Nama Lengkap Almarhum (Sesuai KTP)'
                    name='nama_lengkap_almarhum'
                    placeholder='Cth:  Alwy Raihan maks(40)'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Nama Lengkap Almarhum wajib diisi'
                        },
                        maxLength: {
                            value: 40,
                            message: 'Nama Lengkap Almarhum maksimal 40 karakter'
                        }
                    }}
                    error={errors.nama_lengkap_almarhum}
                />

                <InputText
                    type="number"
                    aria-required
                    label='Umur Almarhum'
                    name='umur'
                    placeholder='Cth: 30'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Umur Almarhum wajib diisi'
                        },
                    }}
                    error={errors.umur}
                />

                <InputText
                    type='text'
                    aria-required
                    label='Jenis Pekerjaan Almarhum'
                    name='riwayat_pekerjaan'
                    placeholder='Cth: ASN'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Jenis Pekerjaan Almarhum wajib diisi'
                        },
                    }}
                    error={errors.riwayat_pekerjaan}
                />

                <InputText
                    type='text'
                    aria-required
                    label='Alamat Lengkap'
                    name='alamat_almarhum'
                    placeholder='Cth: Jl. Raya Cilangkap No. 10'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Alamat Lengkap wajib diisi'
                        },
                    }}
                    error={errors.alamat_almarhum}
                />

                <InputText
                    type='text'
                    aria-required
                    label="Diagnosa"
                    name="diagnosa"
                    placeholder="Cth: Covid-19"
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Diagnosa wajib diisi'
                        },
                    }}
                    error={errors.diagnosa}
                />

                <InputDatepicker
                    aria-required
                    label='Tanggal Meninggal'
                    name='tgl_waktu_meninggal'
                    register={register}
                    error={errors.tgl_waktu_meninggal}
                    rule={{
                        required: {
                            value: true,
                            message: 'Tanggal Meninggal wajib diisi'
                        },
                    }}
                />

                <InputText
                    type="text"
                    aria-required
                    label="Tempat Meninggal"
                    name="tempat_meninggal"
                    placeholder="Cth: RSUD Cilangkap"
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Tempat Meninggal wajib diisi'
                        },
                    }}
                    error={errors.tempat_meninggal}
                />

                <FileInput
                    // aria-required
                    type="file"
                    label='Upload File Bukti Kematian'
                    name='document'
                    // rule={{
                    //     required: {
                    //         value: true,
                    //         message: 'File Bukti Kematian wajib diisi'
                    //     },
                    // }}
                    control={control}
                    id='almarhum.file'
                // error={errors.document}
                />
            </Section>

            {/* THIRD SECTION */}
            <Section className='grid md:grid-cols-2 bg-primary rounded-lg px-4 pb-10 pt-4 gap-x-8 gap-y-4'>

                <ComboBox
                    required
                    label='No. Ruangan'
                    name='no_room'
                    rule={
                        {
                            required: {
                                value: true,
                                message: 'No. Ruangan wajib diisi'
                            },
                        }
                    }
                    options={transformedRoom}
                    control={control}
                    error={errors.no_room}
                />

                <ComboBox
                    required
                    label='Ruangan Kremasi'
                    name='no_kremasi'
                    rule={
                        {
                            required: {
                                value: true,
                                message: 'Ruangan Kremasi wajib diisi'
                            },
                        }
                    }
                    options={transformedKremasi}
                    control={control}
                    error={errors.no_kremasi}
                />

            </Section>

            <Section
                data-testid='save-button'
                className='flex justify-end gap-4'
            >
                <Button
                    type='submit'
                    className='bg-secondary hover:bg-secondary-dark rounded-lg text-white w-32 p-3 mt-2 text-sm'
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