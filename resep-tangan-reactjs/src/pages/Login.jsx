import React from "react";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import Me from "./Me";
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
        <div className="welcome">
          <Me admin={user} />
        </div>
      ) : (
        <LoginForm Login={login} />
      )}
    </div>
  );
}
