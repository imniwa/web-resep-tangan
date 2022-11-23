import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Head, usePage } from '@inertiajs/inertia-react';


export default function RecipeDetails(props){
    const {title} = usePage().props;
    return (
        <>
            <Head title={title.toProperCase()} />
            <Navbar/>
            <div className="container mx-auto min-h-screen">
                helo
            </div>
            <Footer />
        </>
    )
}