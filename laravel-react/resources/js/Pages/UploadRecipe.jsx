import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Head, useForm } from '@inertiajs/inertia-react';

export default function UploadRecipe() {
    const [material, setMaterial] = useState('');
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        thumbnail: '',
        description: '',
        materials: [],
        contents: []
    });

    const handleChange = (e) => {
        setData(e.target.name,e.target.value)
    }

    const handleAddMaterials = (e) => {
        if(material === ''){
            return;
        }
        let copy = [...data.materials];
        copy.push(material);
        setData({ materials: copy });
        setMaterial('');
    }

    const handleRemoveMaterials = (e) => {
        let item = e.currentTarget.getAttribute('data');
        let copy = [...data.materials];
        let index = copy.indexOf(item);
        if (index !== -1) {
            copy.splice(index, 1);
            setData({ materials: copy });
        }
    }

    return (
        <>
            <Head title="Upload Resep" />
            <Navbar />
            <div className="container mx-auto min-h-screen">
                <form action="" className="mx-4 mt-8">
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Judul</label>
                        <input
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Text"
                            required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="thumbnail" className="block mb-2 text-sm font-medium text-gray-900">Thumbnail</label>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500">JPG or PNG (MAX. 800x400px)</p>
                                </div>
                                <input type="file" name="banner" className="hidden" />
                            </label>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Deskripsi</label>
                        <textarea 
                            name="description" 
                            rows="4"
                            value={data.description}
                            onChange={handleChange}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Deskripsikan resepmu..." />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="materials" className="block mb-2 text-sm font-medium text-gray-900">Bahan Masak</label>

                        <div className="flex items-center">
                            <label htmlFor="materials" className="sr-only">Materials</label>
                            <div className="relative w-full">
                                <input type="text"
                                    name="materials"
                                    value={material || ''}
                                    onChange={(e) => setMaterial(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Telur..."
                                    required />
                            </div>
                            <button
                                type="button"
                                onClick={handleAddMaterials}
                                className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>

                        <div className="w-full text-gray-900 bg-white rounded-lg border border-gray-200 mt-4">

                            {
                                data.materials == null ?
                                ''
                                :
                                data.materials.map((e, i) => {
                                    return (
                                        <div className="inline-flex relative place-content-between py-2 px-4 w-full text-sm font-medium border-b border-gray-200" key={i}>
                                            <span>{e}</span>
                                            <button type="button" className="text-red-700" onClick={handleRemoveMaterials} data={e}>
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="contents" className="block mb-2 text-sm font-medium text-gray-900">Langkah - langkah</label>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}