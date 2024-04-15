import React from 'react';
import Image from 'next/image';
import loading from '../../../public/rings.svg'

export default function Loading() {
    return (
        <main>
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col justify-center items-center">
                    <Image src={loading} alt="loader" />
                </div>
            </div>
        </main>
    );
}