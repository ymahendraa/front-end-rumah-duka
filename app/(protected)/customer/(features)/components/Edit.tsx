'use client'
import React, { useEffect } from 'react'

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
import { useSession } from 'next-auth/react';
import useFetcher from '@/hooks/useFetcher';
import useSWR from 'swr';
import useTransformObject from '@/hooks/useTransformObject';

// types import
import { SendCustomer } from '../types/Customer';
import { fileToBase64 } from '@/utils/convertToBase64';
import { trimDate } from '@/utils/trimDate';

/**
 * @description
 * Edit : component for edit existing customer
 * @todo adjust the status
 * 
 * @returns Edit component for edit existing customer
 */
const Edit = ({ id }: { id: string }) => {
    // define session
    const { data: session } = useSession();

    // define fetcher
    const fetcher = useFetcher(session);

    // get selected row data with SWR
    const { data: selectedData, error: errorSelectedData, isLoading: isLoadingData } = useSWR(
        session ? `customer/${id}` : null,
        fetcher,
    )

    // router instance
    const router = useRouter()

    // get form data
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<SendCustomer>();

    // reset form when data is fetched
    useEffect(() => {
        if (selectedData) {
            reset({
                nik: selectedData.nik,
                nama_lengkap_pemohon: selectedData.name,
                hub_almarhum: selectedData.hub_almarhum,
                jenis_pekerjaan: selectedData.pekerjaan,
                alamat: selectedData.alamat,
                nama_lengkap_almarhum: selectedData.almarhum.nama_lengkap,
                umur: selectedData.almarhum.umur,
                riwayat_pekerjaan: selectedData.almarhum.pekerjaan,
                alamat_almarhum: selectedData.almarhum.alamat,
                diagnosa: selectedData.almarhum.diagnosa,
                tgl_waktu_meninggal: trimDate(selectedData.almarhum.tgl_waktu_meninggal),
                tempat_meninggal: selectedData.almarhum.tempat_meninggal,
                document: selectedData.almarhum.document,
                documentDetail: selectedData.almarhum.documentDetail,
                no_room: selectedData.reservasi.room_id,
                no_kremasi: selectedData.reservasi.kremasi_id,
                screenshot: selectedData.reservasi.screenshot,
                status: selectedData.reservasi.status,
                reservation_date: selectedData.reservasi.reservation_date,
                screenshotDetail: selectedData.reservasi.screenshotDetail,
            })
        }

    }, [selectedData, reset]);

    // get submit handler
    const { submitHandler, isLoading } = useSubmit()

    // submit handler
    /**
     * 
     * @todo validate if file is not an instance of File
     * @todo validate if bukti_tf is not an instance of File
    */
    const onSubmit: SubmitHandler<any> = async (data: any) => {
        try {
            if (data.almarhum.file && data.almarhum.file instanceof File) {
                data.almarhum.file = await fileToBase64(data.almarhum.file);
            }
            else {
                // remove file from data
                delete data.almarhum.file
            }
            if (data.reservasi.bukti_tf && data.reservasi.bukti_tf instanceof File) {
                data.reservasi.bukti_tf = await fileToBase64(data.reservasi.bukti_tf);
            }
            else {
                // remove file from data
                delete data.reservasi.bukti_tf
            }
            await submitHandler({
                url: `customer/${id}`,
                config: {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                },
                setOpen: () => { },
                mutate: () => { },
            })
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
    const transformedRoom = useTransformObject(dataRoom || [], 'id', 'no_ruangan')

    // get list of ruangan_kremasi
    const { data: dataKremasi, isLoading: loadingKremasi, error: errorKremasi } = useSWR(
        session ? `ruangan-kremasi?page=1&limit=1000` : null,
        fetcher
    )

    // transform ruangan_kremasi data
    const transformedKremasi = useTransformObject(dataKremasi || [], 'id', 'no_ruangan')

    if (isLoadingData || !selectedData || loadingRoom || loadingKremasi || !dataKremasi || !dataRoom) return <div>Loading...</div>

    if (errorSelectedData || errorKremasi || errorRoom) return <div>Error...</div>

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

            {/* FOURTH SECTION */}
            <Section className='grid md:grid-cols-2 bg-primary rounded-lg px-4 pb-10 pt-4 gap-x-8 gap-y-4'>

                <ComboBox
                    required
                    label='Status Transaksi'
                    name='status'
                    // rule={
                    //     {
                    //         required: {
                    //             value: true,
                    //             message: 'Status transaksi wajib diisi'
                    //         },
                    //     }
                    // }
                    options={[
                        { value: '1', label: 'Lunas' },
                        { value: '2', label: 'Belum Lunas' },
                    ]}
                    control={control}
                    error={errors.status}
                />

                <InputDatepicker
                    label='Tanggal Reservasi'
                    register={register}
                    aria-required
                    classNameWrapper='w-full'
                    name='tgl_waktu_meninggal'
                    // rule={{
                    //     required: {
                    //         value: true,
                    //         message: 'Tanggal Reservasi wajib diisi'
                    //     },
                    // }}
                    error={errors.tgl_waktu_meninggal}
                />

                <FileInput
                    aria-required
                    label='Upload File Bukti Transaksi'
                    type='image'
                    name='screenshot'
                    // rule={{
                    //     required: {
                    //         value: true,
                    //         message: 'File Bukti Transaksi wajib diisi'
                    //     },
                    // }}
                    control={control}
                    id='bukti_transaksi'
                    error={errors.screenshot}
                />

                <Section className='flex items-center md:mt-2'>
                    <p className='text-xs md:text-sm text-white'>Note: Jika Gambar yang di masukan diubah maka status transaksi akan menjadi pending.</p>
                </Section>

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

export default Edit