"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const { register, formState: { errors } } = useForm<LoginFormData>();

 ;

  return (
    <div className="flex items-center justify-center min-h-screen bg-white mt-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-teal-600">Welcome Back</h2>
          <p className="mt-2 text-teal-500">Sign in to your account</p>
        </div>

        <form  className="space-y-4"autoComplete="off">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-teal-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              autoComplete="off"
              className="w-full px-4 py-2 mt-1 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-teal-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              className="w-full px-4 py-2 mt-1 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("remember")}
                className="text-teal-600 border-teal-300 rounded focus:ring-teal-500"
              />
              <span className="ml-2 text-sm text-teal-600">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-sm text-teal-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            className="w-full px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-teal-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-teal-500">Or continue with</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <button
          
            className="flex items-center justify-center px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-700 transition duration-200"
          >
            <Image 
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
              alt="GitHub Logo" 
              width={24} 
              height={24} 
              className="mr-2 rounded-full bg-white p-0.5" 
            />
            Login with GitHub
          </button>
          <button
            
            className="flex items-center justify-center px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-700 transition duration-200"
          >
            <Image 
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" 
              alt="Google Logo" 
              width={24} 
              height={24} 
              className="mr-2 rounded-full bg-white p-0.5" 
            />
            Login with Google
          </button>
        </div>

        <p className="text-sm text-center text-teal-600">
          Dont have an account?{' '}
          <Link href="/register" className="font-medium text-teal-700 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
