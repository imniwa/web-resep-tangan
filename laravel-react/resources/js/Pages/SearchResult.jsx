import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import RecipeCard from '@/Components/RecipeCard';
import { Head, usePage } from '@inertiajs/inertia-react';

export default function SearchResult(props) {
    const {data} = usePage().props
    return (
    <>
        <Head title="Hasil Pencarian"/>
        <Navbar />
            <div className="min-h-screen container mx-auto my-8">
                <h1 className="text-center mb-6">Hasil Pencarian untuk `kata kunci`</h1>
                <div className="grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
                    <RecipeCard href={route('recipe',{'title':'tumis'})} userHref={route('user',{'username':'arnold'})}/>
                    <RecipeCard href={route('recipe',{'title':'tumis'})} userHref={route('user',{'username':'arnold'})}/>
                    <RecipeCard href={route('recipe',{'title':'tumis'})} userHref={route('user',{'username':'arnold'})}/>
                    <RecipeCard href={route('recipe',{'title':'tumis'})} userHref={route('user',{'username':'arnold'})}/>
                </div>
            </div>
        <Footer />
    </>
    )
}