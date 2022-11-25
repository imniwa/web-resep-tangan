import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import RecipeCard from '@/Components/RecipeCard';
import { Head, usePage } from '@inertiajs/inertia-react';

export default function SearchResult(props) {
    const {query,result} = usePage().props
    return (
    <>
        <Head title={`Hasil Pencarian untuk "${query}"`}/>
        <Navbar />
            <div className="min-h-screen container mx-auto my-8">
                <h1 className="text-center mb-6">Hasil Pencarian untuk "<span className="text-blue-800 font-bold">{query}</span>"</h1>
                <div className="grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
                    {
                        result.map((e,i)=>{
                            return(
                                <RecipeCard data={e} key={i}/>
                            )
                        })
                    }
                </div>
            </div>
        <Footer />
    </>
    )
}