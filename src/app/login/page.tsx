"use client";

import { useLoginMutation } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { verifyToken } from "@/utils/verifyToken";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const router = useRouter();
  const dispatch =useAppDispatch()
  const [login, { isLoading }] = useLoginMutation();
  const { 
    register, 
    handleSubmit,
    formState: { errors } 
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    const toastId = toast.loading("Logging in...");
    try{
      const userInfo = {
        email:data.email,
        password:data.password,
      }
     const res=await login(userInfo).unwrap();
     const user = verifyToken(res.data.accessToken) as TUser;
      // console.log(user)
    //  console.log(res)
    dispatch(setUser({user:user, token:res.data.accessToken}) );
  
      toast.success("Logged in successfully!", { id: toastId });
      router.push("/");
      
      // Verify Redux state

    }catch(err){
      toast.error('Something went wrong',{id:toastId ,duration:2000})
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
       <Link href="/">
              <h3 className="text-3xl font-bold text-gray-500 mb-5">
                <span className="text-[#16a085]">Fine</span>Med
              </h3>
            </Link>
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <div className="text-center">
        <h2 className="text-2xl font-bold mb-6 text-teal-600 text-center">
         Log In
        </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-teal-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
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
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-700 transition duration-200 disabled:opacity-70"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex flex-col space-y-3">
         
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