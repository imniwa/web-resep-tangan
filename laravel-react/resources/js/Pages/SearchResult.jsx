import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import RecipeCard from '@/Components/RecipeCard';
import { Head, usePage } from '@inertiajs/inertia-react';
import Paginate from '@/Components/Paginate';

export default function SearchResult(props) {
    const { query, result } = usePage().props;

    const itemsPerPage = 9;
    const [itemOffset, setItemOffset] = useState(0);
    const [current, setCurrent] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = result.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(result.length / itemsPerPage);

    const callBack = (current) => {
        setCurrent(current);
        setItemOffset(current * itemsPerPage % result.length);
        window.scrollTo({
            top:0,
            behavior:'smooth'
        });
    }

    return (
        <>
            <Head title={query == null ? 'Menampilkan seluruh resep' : `Hasil Pencarian untuk "${query}"`} />
            <Navbar />
            <div className="min-h-screen container mx-auto my-8">
                {
                    query == null
                        ?
                        <h1 className="text-center mb-6">Menampilkan seluruh Resep</h1>
                        :
                        <h1 className="text-center mb-6">Hasil Pencarian untuk "<span className="text-blue-800 font-bold">{query}</span>"</h1>
                }
                <div className="grid place-content-center mb-8">
                    <Paginate pageCount={pageCount} handle={callBack} current={current} />
                </div>
                {
                    result.length == 0
                        ?
                        <div className="grid place-content-center h-[50vh]">
                            <h1 className="text-3xl font-bold text-center text-red-400">
                                Tidak ditemukan
                            </h1>
                        </div>
                        :
                        <div className="grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
                            {
                                currentItems.map((e, i) => {
                                    return (
                                        <RecipeCard data={e} key={i} />
                                    )
                                })
                            }
                        </div>
                }
                <div className="grid place-content-center mt-8">
                    <Paginate pageCount={pageCount} handle={callBack} current={current} />
                </div>
            </div>
            <Footer />
        </>
    )
}