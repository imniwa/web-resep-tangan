import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import InputFile from '@/Components/InputFile';
import { Head, useForm, usePage } from '@inertiajs/inertia-react';
import {BASE_STORAGE_API_URL} from '@/assets/config';

export default function UploadRecipe() {
    const { recipe } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        id: recipe?.id || '',
        title: recipe?.title || '',
        banner: {},
        description: recipe?.description || '',
        materials: recipe?.materials || [],
        contents: recipe?.contents || [],
    });

    const bannerThumbnailRef = useRef(null);

    const material = useRef(null);

    const [stepHasThumbnail, setStepHasThumbnail] = useState(false);
    const step = useRef(null);
    const stepFile = useRef(null);
    const stepThumbnail = useRef(null);
    const [stepErrors,setStepErrors] = useState(false);

    useEffect(()=>{
        let loaded = true;
        if(loaded && recipe !== undefined){
            bannerThumbnailRef.current.src = BASE_STORAGE_API_URL+recipe?.banner.path
        }
        return () => {
            loaded = false;
        }
    },[recipe]);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    const handleAddContents = () => {
        if (step.current.value === '') {
            return;
        }
        let file = stepFile.current.files.length == 0 ? null : stepFile.current.files[0];
        setData('contents', [...data.contents, { media: file, step: step.current.value }]);
        step.current.value = '';
        setStepHasThumbnail(false);
    }

    const handleRemoveContents = (e) => {
        let index = e.currentTarget.getAttribute('data');
        let copy = [...data.contents];
        copy.splice(index, 1);
        setData('contents', copy);
    }

    const handleAddMaterials = (e) => {
        if (material.current.value === '') {
            return;
        }
        setData('materials', [...data.materials, material.current.value]);
        material.current.value = '';
    }

    const handleRemoveMaterials = (e) => {
        let index = e.currentTarget.getAttribute('data');
        let copy = [...data.materials];
        copy.splice(index, 1);
        setData('materials', copy);
    }

    const submit = (e) => {
        e.preventDefault();
        if(recipe){ 
            post(route('form-edit-recipe'),data, {
                forceFormData: true,
                onFinish: () => {
                    reset();
                }
            });
        }else{
            post(route('upload'), data, {
                forceFormData: true,
                onFinish: () => {
                    reset();
                }
            });
        }
    };

    return (
        <>
            <Head title="Upload Resep" />
            <Navbar />
            <div className="container mx-auto min-h-screen">
                <form onSubmit={submit} encType="multipart/form-data">
                    <div className="flex flex-col lg:flex-row-reverse">
                        <div className="mx-2 mt-8 lg:w-3/5">
                            <div className={`${errors.title ? 'mb-2' : 'mb-6'}`}>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Judul</label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={data.title}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Text"
                                    required />
                            </div>

                            {
                                errors.title && <p className="mb-2 text-sm text-red-600 dark:text-red-500">{errors.title}</p>
                            }

                            <div className="mb-6">
                                <label htmlFor="thumbnail" className="block mb-2 text-sm font-medium text-gray-900">Thumbnail</label>
                                <div className="flex items-center justify-center w-full">
                                    <InputFile
                                        name="banner"
                                        dimension={{ width: 800, height: 400 }}
                                        thumbnailRef={bannerThumbnailRef}
                                        isEdit={recipe !== undefined}
                                        handleFile={(file) => setData('banner', file)} />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Deskripsi</label>
                                <textarea
                                    name="description"
                                    rows="4"
                                    defaultValue={data.description}
                                    onChange={handleChange}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Deskripsikan resepmu..."
                                    required />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="materials" className="block mb-2 text-sm font-medium text-gray-900">Bahan Masak</label>

                                <div className="flex items-center">
                                    <label htmlFor="materials" className="sr-only">Materials</label>
                                    <div className="relative w-full">
                                        <input type="text"
                                            name="materials"
                                            ref={material}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Telur..."
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAddMaterials}
                                        className="p-2.5 ml-2 text-sm font-medium text-white bg-orange-500 rounded-lg border border-orange-200 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                        <span className="sr-only">Tambah Bahan masak</span>
                                    </button>
                                </div>

                                <div className="w-full text-gray-900 bg-white rounded-lg border border-gray-200 mt-4">

                                    {
                                        data.materials && data.materials.map((e, i) => {
                                                return (
                                                    <div className="inline-flex relative place-content-between py-2 px-4 w-full text-sm font-medium border-b border-gray-200" key={i}>
                                                        <span>{e}</span>
                                                        <button type="button" className="text-red-700" onClick={handleRemoveMaterials} data={i}>
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

                                <div className={`${stepErrors ? 'mb-2' : 'mb-6'}`}>
                                    <label htmlFor="materials" className="sr-only">step</label>
                                    <textarea
                                        name="description"
                                        rows="4"
                                        ref={step}
                                        onBlur={(e) => e.target.value == '' ? setStepErrors(true) : setStepErrors(false)}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Deskripsikan resepmu..." />
                                </div>
                                {stepErrors && <p className="mb-2 text-sm text-red-600 dark:text-red-500">deskripsi langkah tidak boleh kosong</p>}

                                <div className="flex items-center justify-center w-full mb-6">
                                    <InputFile
                                        name="content"
                                        dimension={{ width: 800, height: 400 }}
                                        fileRef={stepFile}
                                        thumbnailRef={stepThumbnail}
                                        stateHasFile={[stepHasThumbnail, (val) => setStepHasThumbnail(val)]}
                                    />
                                </div>

                                <div className="">
                                    <button
                                        type="button"
                                        onClick={handleAddContents}
                                        className="p-2.5 w-full text-center text-sm font-medium text-white bg-orange-500 rounded-lg border border-orange-200 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300">
                                        <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                        Tambah Langkah
                                        <span className="sr-only">Tambah langkah</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mx-2 mt-8 lg:w-2/5">
                            <hr className="mx-auto w-48 h-1 bg-gray-100 rounded border-0 my-8 lg:hidden" />
                            <h1 className="hidden lg:block mb-4">Langkah - langkah</h1>
                            <ol className="relative border-l border-gray-200">

                                {
                                    data.contents && data.contents.map((e, i) => {
                                        return (
                                            <li className="mb-10 ml-4" key={i}>
                                                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                                                <time className="mb-1 text-sm font-normal leading-none text-gray-400">Step {i + 1}</time>
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {e.step}
                                                </h3>
                                                <div className="w-full my-4">
                                                    {
                                                        e.media?.path ?
                                                        <img className="rounded" src={BASE_STORAGE_API_URL+e.media.path} />
                                                        :
                                                        (e.media &&
                                                        <img className="rounded" src={window.URL.createObjectURL(e.media)} />)
                                                    }
                                                </div>
                                                <button
                                                    type="button"
                                                    data={i}
                                                    onClick={handleRemoveContents}
                                                    className="px-5 py-2.5 text-sm font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                                                    Hapus Langkah
                                                </button>
                                            </li>
                                        )
                                    })
                                }

                            </ol>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className={`fixed bottom-0 right-0 z-40 text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}>
                        {
                            processing
                                ?
                                <>
                                    <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                    Menyimpan
                                </>
                                :
                                'Simpan'
                        }
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}