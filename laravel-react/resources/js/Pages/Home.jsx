import React, { useEffect, useRef } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { useDraggable } from "react-use-draggable-scroll";
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { BASE_STORAGE_API_URL } from '@/assets/config';

export default function Home() {
    const ref = useRef();
    const { events } = useDraggable(ref);
    const { topUsers, topRecipes } = usePage().props;

    return (
        <>
            <Head title="Home" />
            <Navbar />
            <div className="container px-4 mx-auto pt-6">
                <div id="top-user">
                    <h1 className="font-medium text-lg mb-4">Pemberi Resep Terbaik</h1>
                    <div className="flex flex-row lg:overflow-hidden overflow-x-auto" {...events} ref={ref}>
                        {topUsers.map((e, i) => {
                            return (
                                <div className="flex flex-col mr-6 flex-none relative" key={`top-user-${i}`}>
                                    <Link href={`${route('user', { 'username': e.username })}`} className="absolute top-0 bottom-0 right-0 left-0" />
                                    <img className="w-36 md:w-36 h-36 rounded object-cover" src={`${BASE_STORAGE_API_URL}/${e.media.path}`} />
                                    <p className="text-lg mt-2 text-center max-w-[9rem] max-h-8 overflow-hidden capitalize">
                                        {e.name}
                                    </p>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                <div id="top-recipes" className="my-16">
                    <h1 className="font-medium text-lg mb-4">Resep Terbaik</h1>
                    <div className="flex flex-row lg:overflow-hidden oveflow-x-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {
                                topRecipes.map((e, i) => {
                                    let title = e.title.toLowerCase().replace(/\W\s*/g, function () { return '-' });
                                    return (
                                        <div className="max-w-sm bg-white hover:bg-gray-100 border border-gray-200 rounded-lg shadow-md" key={`top-recipe-${i}`}>
                                            <Link href={`${route('user-recipe', { 'username': e.user.username, 'title': title })}`}>
                                                <img className="rounded-t-lg" src={`${BASE_STORAGE_API_URL}/${e.banner.path}`} />
                                            </Link>
                                            <div className="p-5">
                                                <Link href="#">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                                        {e.title}
                                                    </h5>
                                                </Link>
                                                <div className="flex items-center space-x-4 mb-2">
                                                    <div className="flex items-center">
                                                        <svg aria-hidden="true" className={`w-5 h-5 ${e.rating == 0 ? 'text-gray-400' : 'text-yellow-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                        <p className="ml-2 text-sm font-bold text-gray-900">{e.rating}</p>
                                                    </div>
                                                    <div className='flex items-center'>
                                                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                                        <p className="ml-2 text-sm font-bold text-gray-900">{e.views}</p>
                                                    </div>
                                                </div>
                                                <p className="mb-3 font-normal text-gray-700">
                                                    {e.description}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
                <div className="text-center mb-16 ">
                    <Link href={route('search')} className="underline text-orange-500 hover:text-orange-700">Tampilkan seluruh resep</Link>
                </div>
            </div>
            <Footer />
        </>
    )
}