import React, { useEffect } from 'react'

// components import
import InputText from '@/components/atoms/input/input-text';
import Button from '@/components/atoms/button';
import ComboBox from '@/components/molecules/combo-box';
import InputIcon from '@/components/molecules/input-icon';
import { ICON } from '@/utils/icon';
import InputTextArea from '@/components/atoms/input/input-text-area';
import LoadingKalla from '@/components/atoms/loading';
import InputCheckbox from '@/components/atoms/input/input-checkbox';
import Label from '@/components/atoms/label';
import Section from '@/components/atoms/section';

// hooks import
import { SubmitHandler, useForm } from 'react-hook-form'
import useSubmit from '@/hooks/useSubmit';
import useFetcher from '@/hooks/useFetcher';
import useSWR from 'swr';
import useTransformObject from '@/hooks/useTransformObject';
import { useSession } from 'next-auth/react';

// utils import
import { AUTHORIZATION_ACCESS } from '@/utils/dummy';


type CreateProps = {
    setOpen: (open: boolean) => void
    mutate: () => void
    url: string
}

/**
 * @description
 * Create : component for creating new menu
 * @param setOpen setOpen function for modal
 * @param mutate mutate function for data
 * @param url url for fetching data
 * @returns Create component for creating new menu
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
        reset,
        formState: { errors },
    } = useForm();

    // get submit handler
    const { submitHandler, isLoading } = useSubmit()

    // submit handler
    const onSubmit: SubmitHandler<any> = async (data: any) => {
        try {
            console.log(data)
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

    // reset form when modal is closed
    useEffect(() => {
        reset();
    }, [setOpen]);

    // define fetcher
    const fetcher = useFetcher(session);
    // get group menu
    // Pass the fetcher to useSWR
    const { data, error, isLoading: isLoadingGroupMenu } = useSWR(
        'authorization/group-menu',
        fetcher
    );

    const transformedData = useTransformObject(data ?? [])

    if (isLoadingGroupMenu) {
        return (
            <section data-testid="loading-component" className='flex justify-center'>
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
                                    value={item.value}
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
                    className='bg-primary hover:bg-primaryDark rounded-md text-white w-full h-8 mt-2 text-sm'
                >
                    {isLoading ? 'loading' : 'Save'}
                </Button>
            </section>
        </form>
    )
}

export default Create