"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRegisterMutation } from "@/redux/features/auth/authApi";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    phone: "",
    address: "",
  });
  const [apiError, setApiError] = useState<string | null>(null);

  const [register, { isLoading, error }] = useRegisterMutation();
  const router = useRouter();

  // Phone number regex: starts with "01" followed by 9 digits
  const phoneRegex = /^01\d{9}$/;

  // Log error from useRegisterMutation when it changes
  useEffect(() => {
    if (error) {
      let msg: string;
  
      // Type guard to check if error has a 'data' property (FetchBaseQueryError)
      if ('data' in error && error.data && typeof error.data === 'object') {
        const errorData = error.data as { errorSources?: Array<{ message: string }>; message?: string };
  
        console.log("R:", errorData?.errorSources);
        if (errorData?.errorSources && errorData.errorSources.length > 0) {
          msg = errorData.errorSources[0].message;
        } else {
          msg = errorData?.message || 'Unknown error';
        }
      } else {
        // Fallback for SerializedError or other error types
        msg = 'An unexpected error occurred';
      }
  
      toast.error(`Registration failed | ${msg}`);
    }
  }, [error]);

  const validatePhone = (phone: string): string => {
    if (!phoneRegex.test(phone)) {
      return "Phone number must start with '01' and be 11 digits long (e.g., 01712345678)";
    }
    return "";
  };

  const validateAddress = (address: string): string => {
    if (address.length < 5) {
      return "Address must be at least 5 characters long";
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setApiError(null); // Clear API error on input change

    // Validate fields on change
    if (name === "phone") {
      setValidationErrors((prev) => ({
        ...prev,
        phone: validatePhone(value),
      }));
    } else if (name === "address") {
      setValidationErrors((prev) => ({
        ...prev,
        address: validateAddress(value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const phoneError = validatePhone(formData.phone);
    const addressError = validateAddress(formData.address);

    setValidationErrors({
      phone: phoneError,
      address: addressError,
    });

    if (phoneError || addressError) {
      toast.error("Please fix the form errors before submitting");
      return;
    }

    try {
      const result = await register(formData).unwrap();
      if (result.success) {
        toast.success("Registration successful! Please log in.");
        router.push("/login");
      }
    } catch (error) {
      console.log("Registration failed:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-10 min-h-[70vh] bg-gray-100">
      <Link href="/">
        <h3 className="text-3xl font-bold text-gray-500">
          <span className="text-[#16a085]">Fine</span>Med
        </h3>
      </Link>
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full mt-8">
        <h2 className="text-2xl mt-5 font-bold mb-6 text-teal-600 text-center">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div>
            <label className="block text-sm font-medium text-teal-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              required
              className="w-full px-4 py-2 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
              className="w-full px-4 py-2 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                validationErrors.phone ? "border-red-500" : "border-teal-300"
              }`}
            />
            {validationErrors.phone && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.phone}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-700">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={2}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                validationErrors.address ? "border-red-500" : "border-teal-300"
              }`}
            />
            {validationErrors.address && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.address}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        {apiError && (
          <p className="text-sm text-center text-red-600 mt-4">{apiError}</p>
        )}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-teal-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;