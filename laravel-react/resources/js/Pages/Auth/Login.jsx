import React, { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });
    const [show, setShow] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <p className="font-thin text-center mb-6">Silahkan Masuk dengan email yang sudah terdaftar</p>
            <form onSubmit={submit}>
                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                    </div>
                    <input
                        type="email"
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                        placeholder="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={onHandleChange}
                        required
                    />
                </div>
                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <input
                        type={
                            show ? 'text' : 'password'
                        }
                        name="password"
                        value={data.password}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
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
                <div className="relative mb-6 text-right">
                    <a href="#" className="underline">Lupa kata sandi?</a>
                </div>
                <div className="relative mb-6">
                    <button type="button" className="text-white bg-primary w-full hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none">
                        Masuk
                    </button>
                    <div className="inline-flex justify-center items-center w-full">
                        <hr className="my-8 w-64 h-px bg-gray-200 border-0" />
                            <span className="absolute left-1/2 px-3 font-thin text-gray-400 bg-white -translate-x-1/2">atau</span>
                    </div>
                    <Link href={route('register')}>
                        <button type="button" className="text-white bg-gray-800 w-full hover:bg-gray-700 focus:ring-4 focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">
                            Daftar
                        </button>
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
