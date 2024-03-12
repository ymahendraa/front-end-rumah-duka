import React, { useEffect } from 'react'

// components import
import InputText from '@/components/atoms/input/input-text';
import Button from '@/components/atoms/button';
import ComboBox from '@/components/molecules/combo-box';
import InputIcon from '@/components/molecules/input-icon';
import InputTextArea from '@/components/atoms/input/input-text-area';
import LoadingKalla from '@/components/atoms/loading';
import Section from '@/components/atoms/section';
import Label from '@/components/atoms/label';
import InputCheckbox from '@/components/atoms/input/input-checkbox';

// hooks import
import useTransformObject from '@/hooks/useTransformObject';
import { SubmitHandler, useForm } from 'react-hook-form'
import useFetcher from '@/hooks/useFetcher';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

// utils import
import { AUTHORIZATION_ACCESS } from '@/utils/dummy';
import { ICON } from '@/utils/icon';

type EditProps = {
    submitHandler: (data: any) => void
    id: string | undefined | number
    isLoading: boolean
    setOpen: (open: boolean) => void
    mutate: () => void
    url: string
}

/**
 * @description
 * Edit : component for editing new menu
 * @param setOpen setOpen function for modal
 * @param mutate mutate function for data
 * @param url url for fetching data
 * @returns Edit component for editing new menu
 * 
 * @example
 * <Edit
 * setOpen={setOpen}
 * mutate={mutate}
 * url='customer'
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
    // define session
    const { data: session } = useSession();
    // define fetcher
    const fetcher = useFetcher(session);
    // get selected row data with SWR
    const { data: selectedData, error: errorSelectedData, isLoading: isLoadingData, isValidating } = useSWR(
        `${url}/${id}`,
        fetcher,
    )

    // get form data
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        getValues,
    } = useForm();

    // reset form when data is fetched
    useEffect(() => {
        if (data) {
            reset({
                name: selectedData?.name,
                group: selectedData?.group,
                position: selectedData?.position,
                icon: selectedData?.icon,
                description: selectedData?.description,
                // actions: ['create', 'read', 'update', 'delete']
                actions: selectedData?.actions.map((item: any) => item.id.toString())
            })
        }

    }, [selectedData, reset]);

    // submit handler
    const onSubmit: SubmitHandler<any> = async (data: any) => {
        try {
            console.log(data)
            // submitHandler({
            //     url: `${url}/${id}`,
            //     config: {
            //         method: 'PATCH',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify(data),
            //     },
            //     setOpen,
            //     mutate,
            // })
        } catch (error) {
            console.log(error)
        }
    }

    // reset form when modal is closed
    useEffect(() => {
        reset();
    }, [setOpen]);


    // get group menu
    // Pass the fetcher to useSWR
    const { data, error, isLoading: isLoadingGroupMenu } = useSWR(
        url,
        fetcher
    );

    const transformedData = useTransformObject(data ?? [])

    if (isLoadingGroupMenu || isLoadingData || isValidating || !selectedData) {
        return (
            <section data-testid="loading-component" className='w-full flex items-center justify-center'>
                <LoadingKalla width={30} height={30} />
            </section>
        )
    }

    if (error || errorSelectedData) {
        return (
            <section data-testid="error-component">
                <p>Error</p>
            </section>
        )
    }

    return (
        <form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit(onSubmit)}>
            <InputText
                type='text'
                label='Name'
                name='name'
                value={selectedData?.name}
                // placeholder='Enter name'
                // aria-required={true}
                // rule={{
                //     required: {
                //         value: true,
                //         message: 'Name is required'
                //     },
                // }}
                // error={errors.name}
                disabled
            />

            <InputText
                type='text'
                label='Group Name'
                name='group'
                value={selectedData?.group?.name}
                // register={register}
                // aria-required={true}
                // placeholder='Enter name'
                // rule={{
                //     required: {
                //         value: true,
                //         message: 'Name is required'
                //     },
                // }}
                // error={errors.name}
                disabled
            />

            {/* <ComboBox
                label='Group name'
                name='group'
                options={transformedData}
                control={control}
            /> */}

            <InputText
                type='number'
                label='Position'
                name='position'
                aria-required={true}
                placeholder='Enter position'
                register={register}
                rule={{
                    required: {
                        value: true,
                        message: 'Position is required'
                    },
                }}
                error={errors.position}
            />

            <InputIcon
                label='Choose icon'
                name='icon'
                control={control}
                // aria-required={true}
                // rule={{
                //     required: {
                //         value: true,
                //         message: 'Icon is required'
                //     },
                // }}
                // error={errors.icon}
                icons={ICON}
            />

            <InputTextArea
                label='Description'
                name='description'
                placeholder='Enter description'
                register={register}
            // rule={{
            //     required: {
            //         value: true,
            //         message: 'Description is required'
            //     },
            // }}
            // error={errors.description}
            />

            {/* <Section
            >
                <Label label="Actions" name="actions" />
                <Section
                    className='flex flex-wrap gap-2 -mt-3'
                >
                    {
                        AUTHORIZATION_ACCESS?.map((item, index) => (
                            <Section
                                key={index}
                                data-testid='authorization-access'
                            >
                                <InputCheckbox
                                    label={item.name}
                                    name="actions"
                                    value={item.id}
                                    register={register}
                                />
                            </Section>
                        ))
                    }
                </Section>
            </Section> */}

            <section
                data-testid='save-button'
            >
                <Button
                    type='submit'
                    className='bg-primary hover:bg-primary-dark rounded-md text-white w-full h-8 mt-2 text-sm'
                >
                    {isLoading ? 'loading' : 'Save'}
                </Button>
            </section>
        </form>
    )
}

export default Edit