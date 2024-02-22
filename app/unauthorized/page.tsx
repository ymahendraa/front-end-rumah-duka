'use client'
import Button from '@/components/atoms/button';
import Section from '@/components/atoms/section';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

/**
 * @description UnauthorizedPage: UnauthorizedPage component for showing unauthorized page
 * @returns UnauthorizedPage component
 */
const UnauthorizedPage: React.FC = () => {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    }
    return (
        <Section className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
            <Image src="./401.svg" alt="unauthorized" width={500} height={500} />
            <p className="text-lg text-gray-600 mb-8">You do not have permission to access this page.</p>
            <Button className="px-4 py-1 bg-secondary text-white text-sm rounded-lg hover:bg-secondaryDark" onClick={handleBack}>Go back</Button>
        </Section>
    );
};

export default UnauthorizedPage;
