import React, { useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Rating from '@/Components/Rating';
import { Link, Head, usePage, useForm } from '@inertiajs/inertia-react';
import { BASE_STORAGE_API_URL } from '@/assets/config';
import Comments from '@/Components/Comments';
import { Inertia } from '@inertiajs/inertia';


export default function RecipeDetails(props) {
    const { recipe, self_rating } = usePage().props;
    const { title, banner, user, description, materials, rating, comments, contents } = recipe;
    const { data, setData, post, processing, errors, reset } = useForm({
        recipe_id: recipe.id,
        comment: ''
    });

    const handleCheckbox = (e) => {
        e.currentTarget.classList.toggle('line-through')
        const target = e.target.querySelector('input')
        if (target != null) {
            target.checked = !target.checked
        }
    }

    const handleRating = (e) => {
        Inertia.post(route('rating-recipe'),{
            recipe_id: recipe.id,
            rating:e,
            is_self: self_rating
        });
    }

    const submitComment = () => {
        Inertia.post(route('comment-recipe'),data);
    }

    return (
        <>
            <Head title={recipe == null ? "Tidak ditemukan" : title} />
            <Navbar />
            <div className="container mx-auto min-h-screen my-8">
                {
                    recipe == null
                        ?
                        <>
                            <div className="text-center">
                                <div className="grid place-content-center h-[50vh]">
                                    <h1 className="text-3xl font-bold text-red-400">
                                        Recipe tidak ditemukan
                                    </h1>
                                </div>
                                <Link href={route('home')}>
                                    <button type="button" class="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                                        Kembali ke halaman utama
                                    </button>
                                </Link>
                            </div>
                        </>
                        :
                        <>
                            <div className="flex flex-col md:flex-row">
                                <div className="px-4 md:w-2/5">
                                    <h1 className="text-center text-xl font-bold mb-4">{title}</h1>
                                    <div className="h-44 overflow-hidden rounded">
                                        <img className="w-full object-cover mt-[-10%]"
                                            src={`${BASE_STORAGE_API_URL}/${banner.path}`}
                                            alt="image description" />
                                    </div>
                                    <div className="flex items-center space-x-4 my-2">
                                        <Link href={route('user', { 'username': user.username })}>
                                            <img className="w-10 h-10 rounded-full"
                                                src={`${BASE_STORAGE_API_URL}/${user.media.path}`} />
                                        </Link>
                                        <div className="font-medium">
                                            <div>
                                                <Link href={route('user', { 'username': user.username })} className="text-lg font-medium capitalize">{user.name}</Link>
                                            </div>
                                            <div className="flex items-center">
                                                <svg aria-hidden="true" className={`w-5 h-5 ${rating == 0 ? 'text-gray-400' : 'text-yellow-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                <p className="ml-2 text-sm font-bold text-gray-900">{rating}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="mx-auto w-48 h-1 bg-gray-100 rounded border-0 my-8" />
                                    <p className="font-light text-gray-500 mb-4 max-w-lg text-justify">
                                        {description}
                                    </p>
                                    <hr className="mx-auto w-48 h-1 bg-gray-100 rounded border-0 my-8" />
                                    <h6 className="font-medium underline mb-4">Bahan - bahan:</h6>
                                    <div className="w-full text-gray-900 bg-white rounded-lg border border-gray-200">

                                        {
                                            materials.map((e, i) => {
                                                return (
                                                    <button
                                                        type="button"
                                                        key={i}
                                                        className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-0"
                                                        onClick={handleCheckbox}>
                                                        <input
                                                            type="checkbox"
                                                            className="mr-2 w-4 h-4 text-orange-600 bg-gray-100 rounded border-gray-300 focus:ring-0"
                                                        />
                                                        {e}
                                                    </button>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                                <div className="px-4 md:w-3/5">
                                    <hr className="mx-auto w-48 h-1 bg-gray-100 rounded border-0 my-8 md:hidden" />
                                    <h6 className="font-meium underline mb-4">Langkah - langkah</h6>
                                    <ol className="relative border-l border-gray-200">

                                        {
                                            contents.map((e, i) => {
                                                return (
                                                    <li className="mb-10 ml-4" key={i}>
                                                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                                                        <time className="mb-1 text-sm font-normal leading-none text-gray-400">Step {i + 1}</time>
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            {e.step}
                                                        </h3>
                                                        <div className="w-full my-4">
                                                            <img className="rounded" src={`${BASE_STORAGE_API_URL}/${e.media.path}`} />
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ol>
                                </div>
                            </div>
                            <hr className="mx-auto w-48 h-1 bg-gray-100 rounded border-0 my-8" />
                            <div className="px-8">
                                <div className="flex place-content-between  ">
                                    <h1 className="text-xl font-medium">Reviews</h1>
                                    <Rating max={5} handle={handleRating} self={self_rating}/>
                                </div>
                                <hr className="my-4 h-px bg-gray-200 border-0" />
                                <form onSubmit={submitComment}>
                                    <div className="flex items-center px-3 py-2">
                                        <div className="p-2 text-gray-500">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                            <span className="sr-only">Comments</span>
                                        </div>
                                        <textarea id="chat" rows="1"
                                            value={data.comment}
                                            required
                                            onChange={(e) => { setData('comment', e.target.value) }}
                                            className="block mr-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Your message..." />
                                        <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100">
                                            <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                                            <span className="sr-only">Send message</span>
                                        </button>
                                    </div>
                                </form>
                                <hr className="my-4 h-px bg-gray-200 border-0" />
                                <div className="grid gap-8">
                                    {
                                        comments.map((e, i) => {
                                            return (
                                                <Comments user={e.user} message={e.message} time={e.created_at} key={i} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                }
            </div>
            <Footer />
        </>
    )
}