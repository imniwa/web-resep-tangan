import { BASE_STORAGE_API_URL } from '@/assets/config';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import React from 'react';

export default function Comments({ id, user, message, time }) {
    const { auth } = usePage().props;
    const createdTime = new Date(Date.parse(time));
    const handleClick = () => {
        Inertia.post(route('delete-comment-recipe'),{
            _id:id
        });
    }
    return (
        <div className=" w-full border px-4 py-2 rounded relative group">
            {
                auth?.user?.id == user.id
                &&
                <div className="lg:opacity-0 absolute top-2 right-0 lg:group-hover:opacity-100 transition-all">
                    <button type="button" onClick={handleClick}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 lg:px-5 py-2.5 mr-2 mb-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            }
            <div className="grid">
                <div className="flex space-x-4">
                    <img className="w-10 h-10 rounded-full" src={`${BASE_STORAGE_API_URL}/${user.media.path}`} />
                    <div className="font-medium">
                        <div>{user.name} <span className="text-sm text-gray-500">@{user.username}</span></div>
                        <div className="text-xs text-gray-400">{new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(createdTime)}</div>
                    </div>
                </div>
                <div className="text-sm text-gray-500 mt-4 mb-2">
                    <p>
                        {message}
                    </p>
                </div>
            </div>
        </div>
    )
}