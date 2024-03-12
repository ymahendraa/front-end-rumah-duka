'use client'
import React from 'react'

// components import
import InputText from '@/components/atoms/input/input-text';
import Button from '@/components/atoms/button';
import FileInput from '@/components/molecules/file-input';
import Section from '@/components/atoms/section';
import ComboBox from '@/components/molecules/combo-box';

// hooks import
import { SubmitHandler, useForm } from 'react-hook-form'
import useSubmit from '@/hooks/useSubmit';
import { useRouter } from 'next/navigation';

/**
 * @description
 * Create : component for creating new customer
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
    } = useForm();

    // define router
    const router = useRouter()

    // get submit handler
    const { submitHandler, isLoading } = useSubmit()

    // define submit handler

    // submit handler
    const onSubmit: SubmitHandler<any> = async (data: any) => {
        try {
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
                    name='name'
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
                    error={errors.name}
                />

                <ComboBox
                    required
                    label='Hubungan Keluarga'
                    name='hub_jenazah'
                    rule={{
                        required: {
                            value: true,
                            message: 'Hubungan Keluarga wajib diisi'
                        }
                    }}
                    options={[
                        { value: '1', label: 'Keluarga' },
                        { value: '2', label: 'Saudara' },
                        { value: '3', label: 'Teman' },
                    ]}
                    control={control}
                    error={errors.hub_jenazah}
                />

                <InputText
                    type='text'
                    aria-required
                    label='Jenis Pekerjaan Customer'
                    name='pekerjaan'
                    placeholder='Cth: ASN'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Jenis Pekerjaan wajib diisi'
                        },
                    }}
                    error={errors.pekerjaan}
                />
            </Section>

            {/* SECOND SECTION */}
            <Section className='grid md:grid-cols-2 bg-primary rounded-lg px-4 pb-10 pt-4 gap-x-8 gap-y-4'>
                <InputText
                    type='text'
                    aria-required
                    label='Nama Lengkap Almarhum (Sesuai KTP)'
                    name='name_jenazah'
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
                    error={errors.name_jenazah}
                />

                <InputText
                    type="number"
                    aria-required

                    label='Umur Almarhum'
                    name='umur_jenazah'
                    placeholder='Cth: 30'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Umur Almarhum wajib diisi'
                        },
                    }}
                    error={errors.umur_jenazah}
                />

                <InputText
                    type='text'
                    aria-required
                    label='Jenis Pekerjaan Almarhum'
                    name='pekerjaan_almarhum'
                    placeholder='Cth: ASN'
                    register={register}
                    rule={{
                        required: {
                            value: true,
                            message: 'Jenis Pekerjaan Almarhum wajib diisi'
                        },
                    }}
                    error={errors.pekerjaan_almarhum}
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
                    aria-required
                    type="file"
                    label='Upload File Bukti Kematian'
                    name='surat_kematian'
                    rule={{
                        required: {
                            value: true,
                            message: 'File Bukti Kematian wajib diisi'
                        },
                    }}
                    control={control}
                    id='surat_kematian'
                    error={errors.surat_kematian}
                />
            </Section>

            {/* THIRD SECTION */}
            <Section className='grid md:grid-cols-2 bg-primary rounded-lg px-4 pb-10 pt-4 gap-x-8 gap-y-4'>

                <ComboBox
                    required
                    label='No. Ruangan'
                    name='ruangan'
                    rule={
                        {
                            required: {
                                value: true,
                                message: 'No. Ruangan wajib diisi'
                            },
                        }
                    }
                    options={[
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' },
                    ]}
                    control={control}
                    error={errors.ruangan}
                />

                <ComboBox
                    required
                    label='Ruangan Kremasi'
                    name='ruangan_kremasi'
                    rule={
                        {
                            required: {
                                value: true,
                                message: 'Ruangan Kremasi wajib diisi'
                            },
                        }
                    }
                    options={[
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' },
                    ]}
                    control={control}
                    error={errors.ruangan_kremasi}
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
                    {isLoading ? 'loading' : 'Simpan'}
                </Button>
                <Button
                    // type='submit'
                    type='button'
                    className='bg-red-500 hover:bg-red-600 rounded-lg text-white w-32 p-3 mt-2 text-sm'
                    onClick={() => router.back()}
                >
                    {isLoading ? 'loading' : 'Kembali'}
                </Button>
            </Section>
        </form>
    )
}

export default Create