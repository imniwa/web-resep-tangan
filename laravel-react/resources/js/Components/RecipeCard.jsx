import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { BASE_STORAGE_API_URL } from '@/assets/config';

export default function RecipeCard(props) {
    const { withoutUser = false, data } = props;
    const { user } = data
    let titleUrl = data.title.toLowerCase().replace(/\W\s*/g, function () { return '-' });
    return (
        <div className="bg-white hover:bg-gray-100 border border-gray-200 rounded-lg shadow-md flex flex-col mx-auto">
            <Link href={route('user-recipe', { 'username': user.username, 'title': titleUrl })}>
                <img className="rounded-l-lg h-full object-cover" src={`${BASE_STORAGE_API_URL}/${data.banner.path}`} />
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
                                        <svg aria-hidden="true" className={`w-5 h-5 ${data.rating == 0 ? 'text-gray-400' : 'text-yellow-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        <p className="ml-2 text-sm font-bold text-gray-900">{data.rating}</p>
                                    </div>

                                </div>
                            </>
                    }
                </div>
                <Link href={route('user-recipe', { 'username': data.user.username, 'title': titleUrl })}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {data.title}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700">
                        {data.description}
                    </p>
                </Link>
            </div>
        </div>
    )
}