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

/**
 * @description
 * Create : component for creating new customer
 *
 * @returns Create component for creating new customer
 */
const Create: React.FC = () => {
    // define session
    const { data: session } = useSession()

    // define state for details
    const [detailName, setDetailName] = useState('');
    const [price, setPrice] = useState(0);
    const [type, setType] = useState('free');
    const [quantity, setQuantity] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(-1);

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
        watch
    } = useForm();

    // define field array
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'details'
    })
    const details = watch('details')

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
     * @description editHandler : function for handling edit button
     * @param {number} index : index of selected row
     * @returns void
     */
    function editHandler(index: number) {
        // const index = selectedRow?.id as number || -1
        setSelectedIndex(index)
        setOpen(true)
        setDetailName(details[index].nama_barang)
        setPrice(details[index].price)
        setType(details[index].jenis_barang)
        setQuantity(details[index].stok)
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
    const { data, isLoading: loadingData, error } = useSWR(
        `customer?page=1&limit=10000`,
        fetcher
    )

    // Watch the value of the name field
    const name = watch('name');

    // Use the value of name to find the corresponding nik
    useEffect(() => {
        if (data && name) {
            const selectedCustomer = data.find((item: any) => item.id_customer === name);
            if (selectedCustomer) {
                // Use setValue to set the value of the nik field
                setValue('nik', selectedCustomer.nik);
            }
        }
    }, [data, name, setValue]);

    // transform data
    const transformedData = useTransformObject(data || [], 'id_customer', 'name')

    if (loadingData || !data) return <div>Loading...</div>

    if (error) return <div>Error...</div>

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
                        disabled
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
                        <InputText
                            label='Nama Barang'
                            value={detailName}
                            onChange={(e) => setDetailName(e.target.value)}
                        />
                        <Section className='flex flex-col gap-1'>
                            <Label name="type" label='Tipe Barang' />
                            <ComboBoxWrapper
                                options={[
                                    { label: 'In Charge', value: 'in charge' },
                                    { label: 'Free', value: 'free' }
                                ]}
                                onBlur={() => { }}
                                value={type}
                                onChange={(e: any) => {
                                    setType(e)
                                }}
                                label='Tipe Barang'
                            />
                        </Section>

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
                            disabled={type === 'free'}
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />

                        <Button
                            type='button'
                            className='bg-secondary hover:bg-secondary-dark rounded-xl text-white p-3 text-sm disabled:bg-gray-700'
                            onClick={() => {
                                if (selectedIndex !== -1) {
                                    update(selectedIndex, {
                                        nama_barang: detailName,
                                        jenis_barang: type,
                                        stok: quantity,
                                        price: price,
                                        total_harga: (price * quantity)
                                    });
                                    setSelectedIndex(-1);
                                    setDetailName('');
                                    setPrice(0);
                                    setType('free');
                                    setQuantity(0);
                                    setOpen(false);
                                    return;
                                }
                                append({
                                    nama_barang: detailName,
                                    jenis_barang: type,
                                    stok: quantity,
                                    total_harga: (price * quantity),
                                    price: price
                                });
                                setDetailName('');
                                setPrice(0);
                                setType('free');
                                setQuantity(0);
                                setOpen(false);
                            }}
                            disabled={!detailName || !quantity || (type !== 'free' && !price)}
                        >
                            Tambah
                        </Button>
                    </div>
                }
            />
        </>

    )
}

export default Create