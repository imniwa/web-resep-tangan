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
                <div className="my-4 flex place-content-between mx-4">
                    <button type="button">
                        <svg class="w-6 h-6 stroke-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </button>
                    <div class="flex items-center space-x-4">
                        <div class="font-medium text-right">
                            <div>Jese Leos</div>
                            <div class="flex items-center mt-1 justify-end">
                                <svg aria-hidden="true" class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <p class="ml-2 text-xs font-bold text-gray-900">4.95</p>
                            </div>
                        </div>
                        <img class="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" />
                    </div>
                </div>
                <div className="mx-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <RecipeCard href={route('recipe', { 'title': 'tumis' })} withoutUser />
                    <RecipeCard href={route('recipe', { 'title': 'tumis' })} withoutUser />
                    <RecipeCard href={route('recipe', { 'title': 'tumis' })} withoutUser />
                    <RecipeCard href={route('recipe', { 'title': 'tumis' })} withoutUser />
                </div>
            </div>
            <Footer />
        </>
    )
}