import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Head, usePage } from '@inertiajs/inertia-react';

export default function Profile() {
    const {auth} = usePage().props;
    return (
    <>
        <Head title={'Settings'} />
        <Navbar />
        <div className="container min-h-screen mx-4">
            user settings
        </div>
        <Footer />
    </>
    );
}