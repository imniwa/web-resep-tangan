"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/Logo.png";
import { Icon } from "@iconify/react";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handelShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container lg:h-screen lg:grid lg:place-items-center">
      <form>
        <div className="form-inner place-items-center lg:grid lg:grid-cols-2 lg:bg-gray-200 lg:rounded-2xl lg:p-10">
          <div className="logo flex items-center flex-col">
            <div className="flex justify-center">
              <Image
                src={Logo}
                alt="logo resep tangan"
                width={256}
                height={256}
              />
            </div>
            <p className=" text-center font-semibold text-xs italic w-56">
              berbagi resep buatan rumah dari tangan ke tangan
            </p>
          </div>

          {/* FORM BOX */}
          <div className="form-box w-full px-4 lg:grid">
            <p className="text-gray-800 text-xs text-center mt-10 lg:mt-4 mb-3">
              Silahkan Masuk dengan email yang sudah terdaftar
            </p>
            {/* INPUT NAMA LENGKAP */}
            <div className="input-box flex flex-col">
              <div
                className={`input flex items-center border border-gray-400 rounded-md py-2 px-4`}
              >
                <input
                  className="flex-grow bg-transparent outline-none"
                  type="text"
                  placeholder="Nama Lengkap"
                  name="name"
                />
              </div>
              <p className="error-message h-5 text-xs text-red-700 mx-2">
                *Nama yang anda masukan tidak valid
              </p>
            </div>

            {/* INPUT EMAIL */}
            <div className="input-box flex flex-col">
              <div
                className={`input flex items-center border border-gray-400 rounded-md py-2 px-4`}
              >
                <input
                  className="flex-grow bg-transparent outline-none"
                  type="email"
                  placeholder="Email"
                  name="email"
                />
              </div>
              <p className="error-message h-5 text-xs text-red-700 mx-2">
                *Email yang anda masukan tidak valid
              </p>
            </div>
            {/* INPUT PASSWORD */}
            <div className="input-box flex flex-col">
              <div
                className={`input flex items-center border border-gray-400 rounded-md py-2 px-4`}
              >
                <input
                  className="flex-grow pr-2 bg-transparent outline-none"
                  type={showPassword ? "text" : "password"}
                  placeholder="Kata Sandi"
                  name="password"
                />
                {showPassword ? (
                  <Icon
                    icon="akar-icons:eye"
                    className="cursor-pointer text-gray-500"
                    onClick={handleShowPassword}
                  />
                ) : (
                  <Icon
                    icon="akar-icons:eye-slashed"
                    className="cursor-pointer text-gray-500"
                    onClick={handleShowPassword}
                  />
                )}
              </div>
              <p className="error-message h-5 text-xs text-red-700 mx-2">
                *Password yang anda masukan tidak valid
              </p>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="input-box flex flex-col">
              <div
                className={`input flex items-center border border-gray-400 rounded-md py-2 px-4`}
              >
                <input
                  className="flex-grow pr-2 bg-transparent outline-none"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Konfirmasi Kata Sandi"
                  name="password"
                />
                {showConfirmPassword ? (
                  <Icon
                    icon="akar-icons:eye"
                    className="cursor-pointer text-gray-500"
                    onClick={handelShowConfirmPassword}
                  />
                ) : (
                  <Icon
                    icon="akar-icons:eye-slashed"
                    className="cursor-pointer text-gray-500"
                    onClick={handelShowConfirmPassword}
                  />
                )}
              </div>
              <p className="error-message h-5 text-xs text-red-700 mx-2">
                *Password yang anda masukan tidak valid
              </p>
            </div>

            {/* FORGOT YOUR PASSWORD */}
            <div className="w-full text-end">
              <Link
                href="/recovery-password"
                className="hover:underline text-xs"
              >
                Lupa Kata Sandi?
              </Link>
            </div>

            {/* BUTTON */}
            <div className="button">
              <input
                type="submit"
                value="Daftar"
                className="w-full bg-orange-500 hover:bg-orange-600 rounded-md py-1 mt-6 text-white font-semibold mb-5"
              />
              <div className="relative flex items-center justify-center w-full border border-t mb-5 bg-gray-400">
                <div className="absolute px-3 bg-white lg:bg-gray-200 text-gray-600">
                  atau
                </div>
              </div>

              <Link
                href="/login"
                className="w-full block bg-gray-500 hover:bg-gray-600 py-1 px-5 rounded-md text-white font-semibold text-center"
              >
                Masuk
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
