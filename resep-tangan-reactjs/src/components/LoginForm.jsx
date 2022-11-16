import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { Icon } from "@iconify/react";

export default function LoginForm({ Login }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Login(user);
  };

  return (
    <div className="container-sm md:h-screen md:grid md:place-items-center">
      <form onSubmit={handleSubmit}>
        <div className="form-inner place-items-center md:grid md:grid-cols-2 md:bg-gray-200 md:rounded-2xl md:p-10 md:shadow-slate-900">
          <div className="logo flex items-center flex-col">
            <div className="flex justify-center">
              <img src={Logo} alt="logo resep tangan" className="w-64 h-64" />
            </div>
            <p className=" text-center font-semibold text-xs italic w-56">
              berbagi resep buatan rumah dari tangan ke tangan
            </p>
          </div>

          {/* FORM BOX */}
          <div className="form-box w-full px-4 md:grid">
            <p className="text-gray-800 text-xs text-center mt-10 md:mt-4 mb-3">
              Silahkan Masuk dengan email yang sudah terdaftar
            </p>
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
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <p className="error-message h-5 text-xs text-error mx-2">
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
                  value={user.password}
                  onChange={handleChange}
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

            {/* FORGOT YOUR PASSWORD */}
            <div className="w-full text-end">
              <Link to="/recovery-password" className="hover:underline text-xs">
                Lupa Kata Sandi?
              </Link>
            </div>

            {/* BUTTON */}
            <div className="button">
              <input
                type="submit"
                value="Masuk"
                className="w-full bg-primary hover:bg-orange-500 rounded-md py-2 mt-6 text-white font-semibold mb-5"
              />
              <div className="relative flex items-center justify-center w-full border border-t mb-5 bg-gray-400">
                <div className="absolute px-3 bg-white text-gray-600 md:bg-gray-200">
                  atau
                </div>
              </div>

              <Link
                to="/register"
                className="w-full block bg-gray-500 hover:bg-gray-700 py-2 px-5 rounded-md text-white font-semibold text-center"
              >
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
