import React, { useEffect, useState } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import RecipeCard from '@/Components/RecipeCard';
import { Head, usePage } from '@inertiajs/inertia-react';
import { BASE_STORAGE_API_URL } from '@/assets/config';
import { Inertia } from '@inertiajs/inertia';

export default function UserDetails(props) {
    const { user, isMe, isFollowing } = usePage().props;
    const [isFollowed, setFollowed] = useState(isFollowing);
    const { recipes } = user;
    const joinedTime = new Date(Date.parse(user.created_at))

    const handleFollow = () => {
        Inertia.post(route('follow'),{username:user.username,is_followed:isFollowed},{
            onSuccess:()=>{
                setFollowed(!isFollowed)
            }
        });
    }

    return (
        <>
            <Head title={user.username} />
            <Navbar />
            <div className="container mx-auto min-h-screen my-8">
                <div className="my-4 flex place-content-center mx-4">
                    <div className="flex items-center space-x-4">
                        <img className="w-24 h-24 rounded-full" src={`${BASE_STORAGE_API_URL}/${user.media.path}`} />
                        <div className="font-medium">
                            <div>{user.name} <br />
                                <span className="text-sm text-gray-500">@{user.username}</span> {isMe ? '' : <button type="button" onClick={handleFollow} className="py-2.5 px-4 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">{isFollowed ? 'Mengikuti' : 'Ikuti'}</button>}</div>
                            <div className="text-xs text-gray-400 my-2">Bergabung pada {new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(joinedTime)}</div>
                            <div className="flex">
                                <button type="button" className="text-gray-900 hover:bg-gray-50 focus:outline-none font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                    <span className="font-bold">{user.followers}</span> pengikut
                                </button>
                                <button type="button" className="text-gray-900 hover:bg-gray-50 focus:outline-none font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                    <span className="font-bold">{user.following}</span> mengikuti
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-8 h-px bg-orange-200 border-0" />
                <div className="mx-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {
                        recipes.map((e, i) => {
                            return (
                                <RecipeCard data={{ ...e, 'user': user }} withoutUser key={i} isMe={isMe} />
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}