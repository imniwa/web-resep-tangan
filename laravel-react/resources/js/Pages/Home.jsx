import React, { useRef } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { useDraggable } from "react-use-draggable-scroll";

export default function Home(props) {
    const ref = useRef();
    const { events } = useDraggable(ref);
    return (
        <>
            <Navbar />
            <div className="container px-8 mx-auto pt-6">
                <div id="top-user">
                    <h1 className="font-medium text-lg mb-4">Pemberi Resep Terbaik</h1>
                    <div className="flex flex-row lg:overflow-hidden overflow-x-auto" {...events} ref={ref}>
                        <div className="flex flex-col mr-6 flex-none relative">
                            <a href="#" className="absolute top-0 bottom-0 right-0 left-0"></a>
                            <img className="w-36 md:w-36 h-36 rounded object-cover" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Extra large avatar" />
                            <p className="text-lg mt-2 text-center max-w-[9rem] max-h-8 overflow-hidden">
                                Arnold Poernomo
                            </p>
                        </div>
                        <div className="flex flex-col mx-6 flex-none relative">
                            <a href="#" className="absolute top-0 bottom-0 right-0 left-0"></a>
                            <img className="w-36 md:w-36 h-36 rounded object-cover" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Extra large avatar" />
                            <p className="text-lg mt-2 text-center max-w-[9rem] max-h-8 overflow-hidden">
                                Arnold Poernomo
                            </p>
                        </div>
                        <div className="flex flex-col mx-6 flex-none relative">
                            <a href="#" className="absolute top-0 bottom-0 right-0 left-0"></a>
                            <img className="w-36 md:w-36 h-36 rounded object-cover" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Extra large avatar" />
                            <p className="text-lg mt-2 text-center max-w-[9rem] max-h-8 overflow-hidden">
                                Arnold Poernomo
                            </p>
                        </div>
                        <div className="flex flex-col mx-6 flex-none relative">
                            <a href="#" className="absolute top-0 bottom-0 right-0 left-0"></a>
                            <img className="w-36 md:w-36 h-36 rounded object-cover" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Extra large avatar" />
                            <p className="text-lg mt-2 text-center max-w-[9rem] max-h-8 overflow-hidden">
                                Arnold Poernomo
                            </p>
                        </div>
                        <div className="flex flex-col mx-6 flex-none relative">
                            <a href="#" className="absolute top-0 bottom-0 right-0 left-0"></a>
                            <img className="w-36 md:w-36 h-36 rounded object-cover" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Extra large avatar" />
                            <p className="text-lg mt-2 text-center max-w-[9rem] max-h-8 overflow-hidden">
                                Arnold Poernomo
                            </p>
                        </div>
                        <div className="flex flex-col mx-6 flex-none relative">
                            <a href="#" className="absolute top-0 bottom-0 right-0 left-0"></a>
                            <img className="w-36 md:w-36 h-36 rounded object-cover" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Extra large avatar" />
                            <p className="text-lg mt-2 text-center max-w-[9rem] max-h-8 overflow-hidden">
                                Arnold Poernomo
                            </p>
                        </div>
                        <div className="flex flex-col mx-6 flex-none relative">
                            <a href="#" className="absolute top-0 bottom-0 right-0 left-0"></a>
                            <img className="w-36 md:w-36 h-36 rounded object-cover" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Extra large avatar" />
                            <p className="text-lg mt-2 text-center max-w-[9rem] max-h-8 overflow-hidden">
                                Arnold Poernomo
                            </p>
                        </div>
                        <div className="flex flex-col mx-6 flex-none relative">
                            <a href="#" className="absolute top-0 bottom-0 right-0 left-0"></a>
                            <img className="w-36 md:w-36 h-36 rounded object-cover" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Extra large avatar" />
                            <p className="text-lg mt-2 text-center max-w-[9rem] max-h-8 overflow-hidden">
                                Arnold Poernomo
                            </p>
                        </div>
                    </div>
                </div>
                <div id="top-recipes" className="my-16">
                    <h1 className="font-medium text-lg mb-4">Resep Terbaik</h1>
                    <div className="flex flex-row lg:overflow-hidden oveflow-x-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                            <div className="max-w-sm bg-white hover:bg-gray-100 border border-gray-200 rounded-lg shadow-md">
                                <a href="#">
                                    <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                </a>
                                <div className="p-5">
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                            Tumis kangkung
                                        </h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700">
                                        Kangkung si sayuran hijau yang tak hanya banyak manfaat tapi juga mudah diolah. 
                                    </p>
                                </div>
                            </div>
                            <div className="max-w-sm bg-white hover:bg-gray-100 border border-gray-200 rounded-lg shadow-md">
                                <a href="#">
                                    <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                </a>
                                <div className="p-5">
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                            Tumis kangkung
                                        </h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700">
                                        Kangkung si sayuran hijau yang tak hanya banyak manfaat tapi juga mudah diolah. 
                                    </p>
                                </div>
                            </div>
                            <div className="max-w-sm bg-white hover:bg-gray-100 border border-gray-200 rounded-lg shadow-md">
                                <a href="#">
                                    <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                </a>
                                <div className="p-5">
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                            Tumis kangkung
                                        </h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700">
                                        Kangkung si sayuran hijau yang tak hanya banyak manfaat tapi juga mudah diolah. 
                                    </p>
                                </div>
                            </div>
                            <div className="max-w-sm bg-white hover:bg-gray-100 border border-gray-200 rounded-lg shadow-md">
                                <a href="#">
                                    <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                </a>
                                <div className="p-5">
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                            Tumis kangkung
                                        </h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700">
                                        Kangkung si sayuran hijau yang tak hanya banyak manfaat tapi juga mudah diolah. 
                                    </p>
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