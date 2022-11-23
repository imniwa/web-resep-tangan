import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function RecipeCard(props) {
    const { href, userHref } = props;
    return (
        <div className="bg-white hover:bg-gray-100 border border-gray-200 rounded-lg shadow-md flex flex-col mx-auto">
            <Link href={href}>
                <img className="rounded-l-lg h-full object-cover" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
            </Link>
            <div className="p-5">
                <div className="flex items-center space-x-4 mb-2">
                    <Link href={userHref}>
                        <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="" />
                    </Link>
                    <div className="font-medium">
                        <div>
                            <Link href={userHref} className="text-lg font-medium">Jese Leos</Link>
                        </div>
                        <div className="flex items-center">
                            <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <p className="ml-2 text-sm font-bold text-gray-900">4.95</p>
                        </div>
                    </div>
                </div>
                <Link href={href}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        Tumis kangkung asdkad ad kasopdkasp dkad kaspdk
                    </h5>
                </Link>
            </div>
        </div>
    )
}