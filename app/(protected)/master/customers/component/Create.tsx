import React from 'react'

// components import
import InputText from '@/components/atoms/input/input-text';
import Button from '@/components/atoms/button';

// hooks import
import { SubmitHandler, useForm } from 'react-hook-form'
import useSubmit from '@/hooks/useSubmit';
import InputDatepicker from '@/components/atoms/input/input-datepicker';

type CreateProps = {
    setOpen: (open: boolean) => void
    mutate: () => void
    url: string
}

/**
 * @description
 * Create : component for creating new customer
 * @param setOpen setOpen function for modal
 * @param mutate mutate function for data
 * @param url url for fetching data
 * @returns Create component for creating new customer
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

    // get form data
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // get submit handler
    const { submitHandler, isLoading } = useSubmit()

    // define submit handler

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

    return (
        <form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit(onSubmit)}>
            <InputText
                type='text'
                required
                label='First Name'
                name='first_name'
                placeholder='Enter first name'
                register={register}
                rule={{
                    required: {
                        value: true,
                        message: 'First name is required'
                    },
                }}
                error={errors.first_name}
            />

            <InputText
                type='text'
                required
                label='Last Name'
                name='last_name'
                placeholder='Enter last name'
                register={register}
                rule={{
                    required: {
                        value: true,
                        message: 'Last name is required'
                    },
                }}
                error={errors.last_name}
            />

            <InputText
                type='text'
                required
                label='Email'
                name='email'
                placeholder='Enter email'
                register={register}
                rule={{
                    required: {
                        value: true,
                        message: 'Email is required'
                    },
                    pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        message: 'Email is not valid'
                    }
                }}
                error={errors.email}
            />

            <InputDatepicker
                label='Join Date'
                required
                name='join_date'
                placeholder='Enter join date'
                register={register}
                rule={{
                    required: {
                        value: true,
                        message: 'Join date is required'
                    },
                }}
                error={errors.join_date}
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