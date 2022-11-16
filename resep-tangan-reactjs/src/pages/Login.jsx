import React from "react";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });

  const login = (details) => {
    try {
      if (
        details.email === "aldiyespaskalisbirta@gmail.com" &&
        details.password === "user123"
      ) {
        setUser({
          email: details.email,
          password: details.password,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="w-screen h-screen grid place-items-center">
      {user.email !== "" ? (
        <div className="welcome">WELCOME {user.email}</div>
      ) : (
        <LoginForm Login={login} />
      )}
    </div>
  );
}
