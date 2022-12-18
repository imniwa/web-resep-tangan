import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import TextInput from '../TextInput';
import { BASE_STORAGE_API_URL } from '@/assets/config';

export default function Navbar(props) {
    const [query,setQuery] = useState('');
    const { auth } = usePage().props
    const [expanded, setExpanded] = useState(false);
    const { get, processing, errors } = useForm();

    const submit = (event) => {
        event.preventDefault();
        if (!query) get(`/search`);
        else get(`/search/${query}`);
    }

    return (
        <nav className="border-gray-200 px-2 sm:px-4 py-2.5 bg-white border-b border-b-primary shadow-sm sticky top-0 z-50">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <Link href={route('home')} className="flex items-center">
                    <span className="self-center text-xl font-bold whitespace-nowrap text-primary">
                        Resep Tangan
                    </span>
                </Link>
                <div className="flex md:order-2">
                    {
                        auth.user == null
                            ?
                            <>
                                <Link href={route('register')} className="text-primary font-bold hover:underline px-6 py-3 mr-4">Daftar</Link>
                                <Link
                                    className="text-white leading-7 font-bold bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                                    href={route('login')}
                                >
                                    Masuk
                                </Link>
                            </>
                            :
                            <>
                                <div className="relative">
                                    <img
                                        type="button"
                                        className="w-10 h-10 rounded-full cursor-pointer"
                                        aria-expanded={expanded}
                                        onClick={() => setExpanded(!expanded)}
                                        src={`${BASE_STORAGE_API_URL}${auth.user.media.path}`} />

                                    <div className={`${expanded ? '' : 'hidden'} absolute right-0 mt-2 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow`}>
                                        <div className="py-3 px-4 text-sm text-gray-900">
                                            <div className="capitalize font-bold">{auth.user.name}</div>
                                            <div className="font-thin truncate text-xs">{auth.user.email}</div>
                                        </div>
                                        <ul className="py-1 text-sm text-gray-700" aria-labelledby="avatarButton">
                                            <li>
                                                <Link href={route('profile')} className="block py-2 px-4 hover:bg-gray-100">Profil</Link>
                                            </li>
                                            <li>
                                                <Link href={route('upload')} className="block py-2 px-4 hover:bg-gray-100">Bagikan Resep</Link>
                                            </li>
                                            <li>
                                                <Link href={route('settings')} className="block py-2 px-4 hover:bg-gray-100">Pengaturan</Link>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <Link href={route('logout')} className="flex items-center py-2 px-4 text-sm text-red-400 hover:bg-red-800 hover:text-white">
                                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                                Keluar
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                </div>
                <div className="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar">
                    <div className="relative mt-4 md:mt-0 md:block">
                        <form onSubmit={submit}>
                            <div className="relative">
                                <TextInput
                                    className="block w-full md:w-[20rem] lg:w-[25rem] p-4 text-sm text-gray-900 border border-orange-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-primary"
                                    value={query}
                                    label="search"
                                    placeholder="Search..."
                                    handleChange={(e) => setQuery(e.target.value)}
                                />
                                <div className=" absolute right-2.5 bottom-2.5">
                                    <button type="submit" className="text-orange-500 focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-2 py-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                                    </button>
                                    <button type="submit" className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
}
