import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/inertia-react';
import TextInput from '../TextInput';

export default function Navbar(props) {
    const [expanded, setExpanded] = useState(false);
    const { data, setData, get, processing, errors } = useForm({
        query: ''
    });

    const showNavigation = () => {
        if (!expanded) {
            document.querySelector('div#navbar').classList.remove('hidden');
        } else {
            document.querySelector('div#navbar').classList.add('hidden');
        }
        setExpanded(!expanded);
    }

    const submit = (event) => {
        event.preventDefault();
        get('/search/')
    }

    return (
        <nav className="border-gray-200 px-2 sm:px-4 py-2.5 bg-white border-b border-b-primary shadow-sm">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <a href={route('home')} className="flex items-center">
                    <span className="self-center text-xl font-bold whitespace-nowrap text-primary">
                        Resep Tangan
                    </span>
                </a>
                <div className="flex md:order-2">
                    <Link href={route('register')} className="text-primary font-bold hover:underline px-6 py-3 mr-4">Daftar</Link>
                    <Link
                        className="text-white leading-7 font-bold bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                        href={route('login')}
                    >
                        Masuk
                    </Link>
                    <button type="button" className="inline-flex items-center p-2 text-sm text-primary rounded-lg md:hidden hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary"
                        onClick={showNavigation}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar">
                    <div className="relative mt-4 md:mt-0 md:block">
                        <form onSubmit={submit}>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <TextInput
                                    className="block w-full md:w-[20rem] lg:w-[25rem] p-4 pl-10 text-sm text-gray-900 border border-orange-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-primary"
                                    value={data.query}
                                    errors={errors.query}
                                    label="search"
                                    placeholder="Search..."
                                    handleChange={(e) => setData('query', e.target.value)}
                                />
                                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
}
