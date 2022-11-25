import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Head, usePage } from '@inertiajs/inertia-react';

export default function Profile() {
    const {auth} = usePage().props;
    const title = auth.user.name.replace(/\w\S*/g, (txt) => {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})
    return (
    <>
        <Head title={title} />
        <Navbar />
        <div className="container min-h-screen mx-4">
            profile
        </div>
        <Footer />
    </>
    );
}