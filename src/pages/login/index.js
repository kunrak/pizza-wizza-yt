import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Login() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("api/userLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const res = await response.json();
    if (res.success) {
      localStorage.setItem("token", res.authToken);
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("isAdmin", await JSON.parse(res.isAdmin));

      router.push("/");
    } else {
      alert(res.error);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      style={{
        height: "90vh",
        backgroundImage:
          'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
      }}
      className="flex justify-center items-center"
    >
      <div className="container w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          action=""
          className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shodow-2xl px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              value={credentials.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="********"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between"></div>
          <button
            type="submit"
            className="border font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100"
          >
            Log in
          </button>
          <Link href="/signup" style={{ all: "unset" }}>
            <button
              type="button"
              className="border font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100"
            >
              New user?
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
