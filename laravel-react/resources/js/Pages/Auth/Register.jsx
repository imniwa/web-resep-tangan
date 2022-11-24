import React, { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react';


export default function Register() {
    const [show, setShow] = useState(false);
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Daftar" />
            <p className="font-thin text-center mb-6">Mendaftar menggunakan email</p>
            <form onSubmit={submit}>

                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    <input
                        type="text"
                        name="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                        placeholder="nama lengkap"
                        value={data.name}
                        onChange={onHandleChange}
                        required
                    />
                </div>

                <div className={`relative ${errors.email ? 'mb-2' : 'mb-6'}`}>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                    </div>
                    <input
                        type="email"
                        name="email"
                        className={`${errors.email ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700' : 'bg-gray-50 border border-gray-300 text-gray-900'} text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5`}
                        placeholder="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={onHandleChange}
                        required
                    />
                </div>

                {
                    errors.email
                        ?
                        <p className="mb-2 text-sm text-red-600 dark:text-red-500">{errors.email}</p>
                        :
                        ''
                }

                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <input
                        type={
                            show ? 'text' : 'password'
                        }
                        name="password"
                        defaultValue={data.password}
                        className={`${errors.password ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700' : 'bg-gray-50 border border-gray-300 text-gray-900'} text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5`}
                        placeholder="kata sandi"
                        autoComplete="password"
                        onChange={onHandleChange}
                        required
                    />
                    <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-2" onClick={() => { setShow(!show) }}>
                        {
                            show ?
                                <svg className="w-8 h-4 text-gray-500 hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                                :
                                <svg className="w-8 h-4 text-gray-500 hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        }
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <input
                        type={
                            show ? 'text' : 'password'
                        }
                        name="passwordConfirmation"
                        defaultValue={data.passwordConfirmation}
                        className={`${errors.password ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700' : 'bg-gray-50 border border-gray-300 text-gray-900'} text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5`}
                        placeholder="konfirmasi kata sandi"
                        onChange={onHandleChange}
                        required
                    />
                    <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-2" onClick={() => { setShow(!show) }}>
                        {
                            show ?
                                <svg className="w-8 h-4 text-gray-500 hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                                :
                                <svg className="w-8 h-4 text-gray-500 hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        }
                    </button>
                </div>

                {
                    errors.password || errors.message
                        ?
                        <p className="mt-2 text-sm text-red-600">{errors.password || errors.message}</p>
                        :
                        ''
                }
                {
                    flash.notification
                        ?
                        <p className="mt-2 text-sm text-green-600">{flash.notification}</p>
                        :
                        ''
                }
                <div className="relative my-6">
                    <button
                        type="submit"
                        className="text-white bg-primary w-full hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none"
                        disabled={processing}>
                        {
                            processing
                                ?
                                <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                :
                                'Daftar'
                        }
                    </button>
                    <div className="inline-flex justify-center items-center w-full">
                        <hr className="my-8 w-64 h-px bg-gray-200 border-0" />
                        <span className="absolute left-1/2 px-3 font-thin text-gray-400 bg-white -translate-x-1/2">atau</span>
                    </div>
                    <Link href={route('login')}>
                        <button type="button" className="text-white bg-gray-800 w-full hover:bg-gray-700 focus:ring-4 focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">
                            Masuk
                        </button>
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
