import React from 'react'

// components import
import InputText from '@/components/atoms/input/input-text';
import Button from '@/components/atoms/button';
import ComboBoxWrapper from '@/components/atoms/combo-box-wrapper';
import ComboBox from '@/components/molecules/combo-box';
import InputIcon from '@/components/molecules/input-icon';
import { ICON } from '@/utils/icon';
import InputTextArea from '@/components/atoms/input/input-text-area';
import LoadingKalla from '@/components/atoms/loading';

// hooks import
import { SubmitHandler, useForm } from 'react-hook-form'
import useSubmit from '@/hooks/useSubmit';
import useFetcher from '@/hooks/useFetcher';
import useSWR from 'swr';
import useTransformObject from '@/hooks/useTransformObject';
import { useSession } from 'next-auth/react';

type CreateProps = {
    setOpen: (open: boolean) => void
    mutate: () => void
    url: string
}

/**
 * @description
 * Create : component for creating new group menu
 * @param setOpen setOpen function for modal
 * @param mutate mutate function for data
 * @param url url for fetching data
 * @returns Create component for creating new group menu
 * 
 * @example
 * <Create
 * setOpen={setOpen}
 * mutate={mutate}
 * url='customer'
 * />
 */
const Create: React.FC<CreateProps> = ({
    setOpen,
    mutate,
    url
}) => {
    // define session
    const { data: session } = useSession()

    // get form data
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    // get submit handler
    const { submitHandler, isLoading } = useSubmit()

    // submit handler
    const onSubmit: SubmitHandler<any> = async (data: any) => {
        try {
            await submitHandler({
                url: url,
                config: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                },
                setOpen,
                mutate,
            })
        } catch (error) {
            console.log(error)
        }
    }

    // define fetcher
    const fetcher = useFetcher(session);
    // get group menu
    // Pass the fetcher to useSWR
    const { data, error, isLoading: isLoadingGroupMenu } = useSWR(
        url,
        fetcher
    );

    const transformedData = useTransformObject(data ?? [])

    if (isLoadingGroupMenu) {
        return (
            <section data-testid="loading-component">
                <LoadingKalla width={30} height={30} />
            </section>
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
        <form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit(onSubmit)}>
            <InputText
                type='text'
                label='Name'
                name='name'
                aria-required={true}
                placeholder='Enter name'
                register={register}
                rule={{
                    required: {
                        value: true,
                        message: 'Name is required'
                    },
                }}
                error={errors.name}
            />

            <ComboBox
                label='Group name'
                name='group'
                options={transformedData}
                control={control}
            />

            <InputText
                type='text'
                label='Code'
                name='code'
                aria-required={true}
                placeholder='Enter code'
                register={register}
                rule={{
                    required: {
                        value: true,
                        message: 'Code is required'
                    },
                }}
                error={errors.code}
            />

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
                aria-required={true}
                control={control}
                rule={{
                    required: {
                        value: true,
                        message: 'Icon is required'
                    },
                }}
                error={errors.icon}
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

            <section
                data-testid='save-button'
            >
                <Button
                    type='submit'
                    className='bg-primary hover:bg-primaryDark rounded-md text-white w-full h-8 mt-2 text-sm'
                >
                    {isLoading ? 'loading' : 'Save'}
                </Button>
            </section>
        </form>
    )
}

export default Create