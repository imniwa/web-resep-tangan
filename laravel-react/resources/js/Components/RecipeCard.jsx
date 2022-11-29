import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { BASE_STORAGE_API_URL } from '@/assets/config';
import { Inertia } from '@inertiajs/inertia';

export default function RecipeCard(props) {
    const { withoutUser = false, data, isMe = false } = props;
    const { user, title, description, banner, rating } = data;
    const [showModal, setShowModal] = useState(false);

    let titleUrl = title.toLowerCase().replace(/\W\s*/g, function () { return '-' });

    const handleEdit = () => {
        Inertia.post(route('edit-recipe'), {
            recipe: data
        });
    }

    const handleDelete = () => {
        Inertia.post(route('delete-recipe'), {
            _id: data.id
        });
        setShowModal(false);
    }

    const handleModal = () => {
        setShowModal(!showModal);
    }

    return (
        <>
            <div className="bg-white hover:bg-gray-100 border border-gray-200 rounded-lg shadow-md flex flex-col mx-auto group relative">
                {
                    isMe &&
                    <>
                        <div className="lg:opacity-0 absolute top-2 right-0 lg:group-hover:opacity-100">
                            {/* <button type="button" onClick={handleEdit}
                                className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </button> */}
                            <button type="button" onClick={handleModal}
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    </>
                }
                <Link href={route('user-recipe', { 'username': user.username, 'title': titleUrl })}>
                    <img className="rounded-t-lg h-full object-cover" src={`${BASE_STORAGE_API_URL}/${banner.path}`} />
                </Link>
                <div className="p-5">
                    <div className="flex items-center space-x-4 mb-2">
                        {
                            withoutUser ?
                                ''
                                :
                                <>
                                    <Link href={route('user', { 'username': user.username })}>
                                        <img className="w-10 h-10 rounded-full" src={`${BASE_STORAGE_API_URL}/${user.media.path}`} />
                                    </Link>
                                    <div className="font-medium">
                                        <div>
                                            <Link href={route('user', { 'username': user.username })} className="text-lg font-medium capitalize">
                                                {user.name}
                                            </Link>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <svg aria-hidden="true" className={`w-5 h-5 ${rating == 0 ? 'text-gray-400' : 'text-yellow-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                            <p className="ml-2 text-sm font-bold text-gray-900">{rating}</p>
                                        </div>

                                    </div>
                                </>
                        }
                    </div>
                    <Link href={route('user-recipe', { 'username': user.username, 'title': titleUrl })}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                            {title}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700">
                            {description}
                        </p>
                    </Link>
                </div>
            </div>
            {
                showModal &&
                <div tabIndex={`-1`} className={`${showModal ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 md:inset-0 h-modal md:h-full bg-gray-900/40`}>
                    <div className="relative w-full max-w-md h-full md:h-auto mx-auto top-1/4">
                        <div className="relative bg-white rounded-lg shadow">
                            <button type="button" onClick={handleModal}
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-6 text-center">
                                <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500">
                                    Apakah anda yakin akan menghapus resep <br /> <span className="text-blue-600">{title}</span>
                                </h3>
                                <button type="button" onClick={handleDelete}
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    Ya
                                </button>
                                <button type="button"
                                    onClick={handleModal}
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}