import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { Icon } from "@iconify/react";

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  return (
    <div className="container-sm md:h-screen md:grid md:place-items-center">
      <form>
        <div className="form-inner items-center md:grid md:grid-cols-2 md:bg-gray-200 md:rounded-2xl md:p-10 md:shadow-slate-900">
          <div className="logo flex items-center flex-col ">
            <img src={Logo} alt="logo resep tangan" className="w-64 h-64" />
            <p className=" text-center text-xs font-poppins italic w-56">
              berbagi resep buatan rumah dari tangan ke tangan
            </p>
          </div>

          {/* FORM BOX */}
          <div className="form-box w-full px-4 md:grid">
            <p className="text-gray-800 text-xs text-center mt-7 md:mt-4 mb-3 font-ibm">
              Mendaftar menggunakan email
            </p>
            {/* INPUT NAMA LENGKAP */}
            <div className="input-box flex flex-col">
              <div
                className={`input flex items-center border border-gray-400 rounded-md h-12 px-4`}
              >
                <input
                  className="flex-grow bg-transparent outline-none"
                  type="text"
                  placeholder="Nama Lengkap"
                  name="nama"
                />
              </div>
              <p className="error-message h-5 text-xs text-error mx-2">
                *Nama yang anda masukan tidak valid
              </p>
            </div>
            {/* INPUT EMAIL */}
            <div className="input-box flex flex-col">
              <div
                className={`input flex items-center border border-gray-400 rounded-md h-12 px-4`}
              >
                <input
                  className="flex-grow bg-transparent outline-none"
                  type="email"
                  placeholder="Email"
                  name="email"
                />
              </div>
              <p className="error-message h-5 text-xs text-error mx-2">
                *Email yang anda masukan tidak valid
              </p>
            </div>

            {/* INPUT PASSWORD */}
            <div className="input-box flex flex-col">
              <div
                className={`input flex items-center border border-gray-400 rounded-md h-12 px-4`}
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
              <p className="error-message h-5 text-xs text-error mx-2">
                *Password yang anda masukan tidak valid
              </p>
            </div>

            {/* INPUT KONFIRMASI PASSWORD */}
            <div className="input-box flex flex-col">
              <div
                className={`input flex items-center border border-gray-400 rounded-md h-12 px-4`}
              >
                <input
                  className="flex-grow pr-2 bg-transparent outline-none"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Kata Sandi"
                  name="password"
                />
                {showConfirm ? (
                  <Icon
                    icon="akar-icons:eye"
                    className="cursor-pointer text-gray-500"
                    onClick={handleShowConfirm}
                  />
                ) : (
                  <Icon
                    icon="akar-icons:eye-slashed"
                    className="cursor-pointer text-gray-500"
                    onClick={handleShowConfirm}
                  />
                )}
              </div>
              <p className="error-message h-5 text-xs text-error mx-2">
                *Password yang anda masukan tidak valid
              </p>
            </div>

            {/* BUTTON */}
            <div className="button">
              <input
                type="submit"
                value="Daftar"
                className="w-full bg-primary hover:bg-orange-500 rounded-md py-1 mt-6 text-white font-semibold mb-5"
              />
              <div className="relative flex items-center justify-center w-full border border-t mb-5 bg-gray-400">
                <div className="absolute px-3 bg-white text-gray-600 md:bg-gray-200">
                  atau
                </div>
              </div>

              <Link
                to="/login"
                className="w-full block bg-gray-500 hover:bg-gray-700 py-1 px-5 rounded-md text-white font-semibold text-center items-center mb-5"
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
