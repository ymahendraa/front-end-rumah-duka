'use client'
import React, { useEffect, useState } from 'react'

// components import
import InputText from '@/components/atoms/input/input-text';
import Button from '@/components/atoms/button';
import Section from '@/components/atoms/section';
import ComboBox from '@/components/molecules/combo-box';

// hooks import
import { SubmitHandler, useForm, useFieldArray, Controller, set } from 'react-hook-form'
import useSubmit from '@/hooks/useSubmit';
import { useRouter } from 'next/navigation';
import useFetcher from '@/hooks/useFetcher';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import useTransformObject from '@/hooks/useTransformObject';
import Modal from '@/components/atoms/modal';
import useModalState from '@/hooks/useModalState';
import { PlusIcon } from '@heroicons/react/24/outline';
import useColumns from './useColumns';
import { DataTableBase } from '@/components/organisms/table/data-table';
import ComboBoxWrapper from '@/components/atoms/combo-box-wrapper';
import Label from '@/components/atoms/label';
import Loading from '@/components/atoms/loader/loading';
import useOperatingDetail from '../../hooks/useOperatingDetails';
import useTransformBarang from '../../hooks/useTransformBarang';

/**
 * @description
 * Edit : component for editing existing customer
 *
 * @returns Edit component for editing existing customer
 */

type EditProps = {
    id: string

}

const Edit: React.FC<EditProps> = ({
    id
}) => {
    // define session
    const { data: session } = useSession()

    // define modal state
    const {
        open,
        setOpen,
    } = useModalState()

    // get form data
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        watch,
        reset
    } = useForm();

    // define field array
    const { append, remove, update } = useFieldArray({
        control,
        name: 'detail_barang'
    })
    const details = watch('detail_barang')

    // define function for adding detail barang
    const {
        id: idDetail,
        setId,
        addDetail,
        detailName,
        setDetailName,
        price,
        setPrice,
        type,
        setType,
        quantity,
        setQuantity,
        selectedIndex,
        editHandler,
        editDetail,
        resetDetail
    } = useOperatingDetail(
        {
            append,
            update,
            setOpen,
            details,
        }
    )

    // define router
    const router = useRouter()

    // get submit handler
    const { submitHandler, isLoading } = useSubmit()

    // get columns
    const {
        columns,
        // selectedRow,
        // openDelete,
        // setOpenDelete
    } = useColumns(
        editHandler,
        deleteHandler,
        details
    )

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

    /**
     * @description deleteHandler : function for handling delete button
     * @param {number} index : index of selected row
     * @returns void
     */
    function deleteHandler(index: number) {
        remove(index)
    }

    // define fetcher
    const fetcher = useFetcher(session);

    // get list of customer
    const { data: dataCustomer, isLoading: loadingCustomer, error: errorCustomer } = useSWR(
        session ? `customer?page=1&limit=10000` : null,
        fetcher
    )

    // Watch the value of the name field
    const name = watch('name');

    // Use the value of name to find the corresponding nik
    useEffect(() => {
        if (dataCustomer && name) {
            const selectedCustomer = dataCustomer.data.find((item: any) => item.id === name);
            if (selectedCustomer) {
                // Use setValue to set the value of the nik field
                setValue('nik', selectedCustomer.nik);
            }
        }
    }, [dataCustomer, name, setValue]);

    // get list current reservasi
    const { data: selectedData, isLoading: loadingSelected, error: errorSelected } = useSWR(
        `reservasi/${id}`,
        fetcher
    )

    // reset form when data is fetched
    useEffect(() => {
        if (selectedData) {
            reset({
                name: selectedData?.id_customer,
                nik: selectedData?.nik,
                detail_barang: selectedData?.detail_barang || []
            })
        }
    }, [selectedData, reset]);

    // transform data
    const transformedData = useTransformObject(dataCustomer?.data ?? [], 'id', 'name')

    // get all barang
    const { data: dataBarang, isLoading: loadingBarang, error: errorBarang } = useSWR(
        session ? `data-barang?page=1&limit=10000` : null,
        fetcher
    )

    // transform data
    const transformedBarang = useTransformBarang(dataBarang?.data ?? [], 'nama_barang')

    // reset detail form every time the modal is closed
    useEffect(() => {
        if (!open) {
            resetDetail()
        }
    }, [open, resetDetail])

    if (loadingCustomer || !dataCustomer || loadingSelected || !selectedData || loadingBarang || !dataBarang) return <Loading />

    if (errorCustomer || errorSelected || errorBarang) return <div>Error...</div>

    return (
        <>
            <form className='flex flex-col gap-8 w-full' onSubmit={handleSubmit(onSubmit)}>
                {/* FIRST SECTION */}
                <Section className='grid md:grid-cols-2 bg-primary rounded-xl px-4 pb-10 pt-4 gap-x-8 gap-y-4'>

                    <ComboBox
                        required
                        label='Nama Lengkap Customer'
                        name='name'
                        rule={{
                            required: {
                                value: true,
                                message: 'Nama Lengkap Customer wajib diisi'
                            }
                        }}
                        options={transformedData}
                        control={control}
                        error={errors.name}
                    />


                    <InputText
                        readOnly
                        // required
                        label='NIK'
                        name='nik'
                        // rule={{
                        //     required: {
                        //         value: true,
                        //         message: 'NIK wajib diisi'
                        //     }
                        // }}
                        register={register}
                    // error={errors.nik}
                    />


                </Section>

                {/* SECOND SECTION */}
                <Section className='flex flex-col bg-primary rounded-xl px-4 pb-4 pt-4 gap-x-8 gap-y-4'>
                    <DataTableBase
                        data={details || []}
                        columns={columns}
                    />
                    <Button
                        type='button'
                        className='flex items-center justify-center bg-primary border rounded-xl text-white p-3 text-sm gap-2 hover:bg-secondary-dark transition-colors duration-300 ease-in-out '
                        onClick={() => setOpen(true)}
                    >
                        <PlusIcon className='w-6 h-6' />
                        Tambah Barang Lainnya
                    </Button>
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
                        Kembali
                    </Button>
                </Section>
            </form>

            <Modal
                isOpen={open}
                setIsOpen={setOpen}
                dialogTitle='Tambah Barang Lainnya'
                dialogContent={
                    <div className='flex w-[300px] flex-col gap-4'>
                        <Section className='flex flex-col gap-1'>
                            <Label name="type" label='Tipe Barang' />
                            <ComboBoxWrapper
                                options={transformedBarang}
                                onBlur={() => { }}
                                value={idDetail}
                                onChange={(e: any) => {
                                    setId(e)
                                    // get detail name based on e
                                    const [id, nama_barang, jenis_barang, harga] = e.split(';')
                                    setDetailName(nama_barang)
                                    setType(jenis_barang)
                                    setPrice(Number(harga))
                                }}
                                label='Nama Barang'
                            />
                        </Section>

                        <InputText
                            type='text'
                            label='Jenis Barang'
                            value={type}
                            readOnly
                        // onChange={(e) => setQuantity(Number(e.target.value))}
                        />

                        <InputText
                            type='number'
                            label='Kuantitas'
                            value={quantity}
                            min={1}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                        <InputText
                            type='number'
                            label='Harga Barang'
                            value={price}
                            // disabled={type === 'Free'}
                            readOnly
                        // onChange={(e) => setPrice(Number(e.target.value))}
                        />

                        <Button
                            type='button'
                            className='bg-secondary hover:bg-secondary-dark rounded-xl text-white p-3 text-sm disabled:bg-gray-700'
                            onClick={() => {
                                if (selectedIndex !== -1) {
                                    editDetail();
                                    return;
                                }
                                addDetail();
                            }}
                            disabled={!idDetail || !quantity}
                        >
                            {selectedIndex !== -1 ? 'Simpan' : 'Tambah'}
                        </Button>
                    </div>
                }
            />
        </>

    )
}

export default Edit