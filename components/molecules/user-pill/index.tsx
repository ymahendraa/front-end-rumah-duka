import React from 'react'
// components import
import Icon from '@/components/atoms/icon'
import Section from '@/components/atoms/section'
import { UserCircleIcon } from '@heroicons/react/24/outline'

type UserPillProps = {
    minimized?: boolean
}

const UserPill: React.FC<UserPillProps> = ({
    minimized
}) => {
    return (
        <Section className='w-full flex justify-start items-center px-2 gap-x-3'>
            <Icon icon={<UserCircleIcon className='h-10 w-10 text-white' />} />
            {!minimized &&
                <Section className='flex flex-col'>
                    <p className='text-white text-sm'>Admin</p>
                    <p className='text-gray-600 text-xs'>Admin</p>
                </Section>
            }
        </Section>
    )
}

export default UserPill