import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';
import Toast from '@/Components/Toast';

export default function Guest({ children }) {
    return (
        <>
            <div className="md:bg-gray-100 min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 lg:grid lg:grid-cols-2 relative">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="w-64 h-64 mx-auto" />
                    </Link>
                    <p className="font-medium italic max-w-sm text-center px-16 mx-auto">berbagi resep buatan rumah dari tangan ke tangan.</p>
                </div>
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg md:mb-8">
                    {children}
                </div>
            </div>
        </>
    );
}
