import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import RecipeCard from '@/Components/RecipeCard';
import { Head, usePage } from '@inertiajs/inertia-react';

export default function UserDetails(props) {
    const { username } = usePage().props;
    return (
        <>
            <Head title={username.toProperCase()} />
            <Navbar />
            <div className="container mx-auto min-h-screen">
                <div className="mt-4">
                    <button type="button">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </button>
                </div>
                <div className="grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
                    <RecipeCard href={route('recipe', { 'title': 'tumis' })} withoutUser/>
                    <RecipeCard href={route('recipe', { 'title': 'tumis' })} withoutUser/>
                    <RecipeCard href={route('recipe', { 'title': 'tumis' })} withoutUser/>
                    <RecipeCard href={route('recipe', { 'title': 'tumis' })} withoutUser/>
                </div>
            </div>
            <Footer />
        </>
    )
}