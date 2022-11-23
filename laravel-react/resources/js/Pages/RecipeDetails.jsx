import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Rating from '@/Components/Rating';
import { Link, Head, usePage } from '@inertiajs/inertia-react';


export default function RecipeDetails(props) {
    const { title } = usePage().props;
    const userHref = '#';
    const handleCheckbox = (e) => {
        const target = e.target.querySelector('input')
        if (target != null) {
            target.checked = !target.checked
        }
    }
    return (
        <>
            <Head title={title.toProperCase()} />
            <Navbar />
            <div className="container mx-auto min-h-screen my-8">
                <div className="flex flex-col md:flex-row">
                    <div className="px-8">
                        <h1 className="text-center text-xl font-bold mb-4">Tumis kangkung</h1>
                        <div className="h-44 overflow-hidden rounded">
                            <img className="w-full object-cover mt-[-10%]" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="image description" />
                        </div>
                        <div className="flex items-center space-x-4 my-2">
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
                    </div>
                    <div className="px-8">
                        <hr className="mx-auto w-48 h-1 bg-gray-100 rounded border-0 my-8" />
                        <p className="font-light text-gray-500 mb-4">Kangkung si sayuran hijau yang tak hanya banyak manfaat tapi juga mudah diolah. </p>
                        <hr className="mx-auto w-48 h-1 bg-gray-100 rounded border-0 my-8" />
                        <h6 className="font-medium underline mb-4">Bahan - bahan:</h6>
                        <div className="w-full text-gray-900 bg-white rounded-lg border border-gray-200">

                            <button
                                type="button"
                                className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-0"
                                onClick={handleCheckbox}>
                                <input
                                    type="checkbox"
                                    className="mr-2 w-4 h-4 text-orange-600 bg-gray-100 rounded border-gray-300 focus:ring-0"
                                />
                                Tomat 4 kg
                            </button>
                            <button
                                type="button"
                                className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-0"
                                onClick={handleCheckbox}>
                                <input
                                    type="checkbox"
                                    className="mr-2 w-4 h-4 text-orange-600 bg-gray-100 rounded border-gray-300 focus:ring-0"
                                />
                                Selada 4 kg
                            </button>

                        </div>
                        <hr className="mx-auto w-48 h-1 bg-gray-100 rounded border-0 my-8" />
                        <h6 className="font-meium underline mb-4">Langkah - langkah</h6>
                        <ol className="relative border-l border-gray-200">

                            <li className="mb-10 ml-4">
                                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                                <time className="mb-1 text-sm font-normal leading-none text-gray-400">Step 1</time>
                                <h3 className="text-lg font-semibold text-gray-900">Iris tipis bawang putih dan bawang merah. Potong serong cabai rawit merah dan cabai keriting.</h3>
                                <div className="w-full my-4">
                                    <img className="rounded" src="https://flowbite.com/docs/images/blog/image-1.jpg" />
                                </div>
                            </li>
                            <li className="mb-10 ml-4">
                                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                                <time className="mb-1 text-sm font-normal leading-none text-gray-400">Step 1</time>
                                <h3 className="text-lg font-semibold text-gray-900">Iris tipis bawang putih dan bawang merah. Potong serong cabai rawit merah dan cabai keriting.</h3>
                                <div className="w-full my-4">
                                    <img className="rounded" src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                                </div>
                            </li>
                            <li className="mb-10 ml-4">
                                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                                <time className="mb-1 text-sm font-normal leading-none text-gray-400">Step 1</time>
                                <h3 className="text-lg font-semibold text-gray-900">Iris tipis bawang putih dan bawang merah. Potong serong cabai rawit merah dan cabai keriting.</h3>
                                <div className="w-full my-4">
                                    <img className="rounded" src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                                </div>
                            </li>

                        </ol>
                    </div>
                </div>
                <hr className="mx-auto w-48 h-1 bg-gray-100 rounded border-0 my-8" />
                <div className="px-8">
                    <div className="flex place-content-between  ">
                        <h1 className="text-xl font-medium">Reviews</h1>
                        <Rating max={5} />
                    </div>
                    <hr className="my-4 h-px bg-gray-200 border-0" />
                    <form>
                        <div className="flex items-center px-3 py-2">
                            <div className="p-2 text-gray-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                <span className="sr-only">Comments</span>
                            </div>
                            <textarea id="chat" rows="1" className="block mr-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Your message..."></textarea>
                            <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100">
                                <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                                <span className="sr-only">Send message</span>
                            </button>
                        </div>
                    </form>
                    <hr className="my-4 h-px bg-gray-200 border-0" />
                    <div className="grid gap-8">
                        <div className="flex items-center space-x-4 w-full border px-4 py-2 rounded">
                            <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" />
                            <div className="font-medium">
                                <div>Jese Leos</div>
                                <div className="text-sm text-gray-500 mt-4">
                                    <textarea id="message" rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 rounded border-none focus:ring-0 focus:border-inherit resize-none"
                                        value="this is my comment"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}