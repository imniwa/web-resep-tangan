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
                        {   topUsers.map((e, i) => {
                                return (
                                    <div className="flex flex-col mr-6 flex-none relative" key={`top-user-${i}`}>
                                        <Link href={`${route('user', { 'username': e.username })}`} className="absolute top-0 bottom-0 right-0 left-0" />
                                        <img className="w-36 md:w-36 h-36 rounded object-cover" src={`${BASE_STORAGE_API_URL}/${e.media.path}`}/>
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
                                    let title = e.title.toLowerCase().replace(/\W\s*/g, function(){return '-'});
                                    return (
                                        <div className="max-w-sm bg-white hover:bg-gray-100 border border-gray-200 rounded-lg shadow-md" key={`top-recipe-${i}`}>
                                            <Link href={`${route('user-recipe',{'username':e.user.username,'title':title})}`}>
                                                <img className="rounded-t-lg" src={`${BASE_STORAGE_API_URL}/${e.banner.path}`} />
                                            </Link>
                                            <div className="p-5">
                                                <Link href="#">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                                        {e.title}
                                                    </h5>
                                                </Link>
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
            </div>
            <Footer />
        </>
    )
}