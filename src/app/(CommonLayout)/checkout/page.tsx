"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner"; // Switched to sonner
import { clearCart } from "@/redux/features/cart/cartSlice";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { postImage } from "@/utils/postImage";
import { ProtectedRoute } from "@/components/protectedRoutes/ProtectedRouteProps";

// Define custom error type to handle RTK Query error shapes
interface OrderError {
  data?: {
    message?: string;
  };
  message?: string; // Fallback for SerializedError
}

// Define TProduct to match orderApi expectation
type TProduct = { productId: string; quantity: number }[];

export interface IOrderData {
  userName: string;
  userEmail: string;
  products: TProduct;
  totalPrice: number;
  address: string;
  contactNumber: string;
  prescriptionImageLink?: string;
  paymentMethod: "cashOnDelivery" | "sslcommerz";
}

const CheckoutPage = () => {
  const { items } = useAppSelector((state) => state.cart);
  const authUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [prescription, setPrescription] = useState<File | null>(null);
  const [prescriptionRequiredState, setPrescriptionRequiredState] = useState(false);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const needPrescription = items.some((item) => item.prescriptionRequired);
    setPrescriptionRequiredState(needPrescription);
  }, [items]);

  useEffect(() => {
    if (error) {
      const orderError = error as OrderError;
      toast(`❌ Order error: ${orderError.data?.message || orderError.message || "Unknown error"}`);
    }
  }, [error]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPrescription(e.target.files[0]);
    }
  };

  const handleCODOrder = async () => {

    if (!authUser?.userEmail) {
      toast("❌ Please log in to place an order");
      return;
    }
    if (!name || !address || !phone) {
      toast("❌ Please fill all shipping details");
      return;
    }
    if (prescriptionRequiredState && !prescription) {
      toast("❌ Prescription is required");
      return;
    }

    let prescriptionImageLink: string | undefined;
    if (prescription) {
      try {
        console.log("Uploading prescription image...");
        prescriptionImageLink = await postImage(prescription);
        console.log("Prescription image uploaded:", prescriptionImageLink);
      } catch (error) {
        const err = error as Error;
        console.error("Prescription upload failed:", err);
        toast(`❌ Failed to upload prescription image: ${err.message || "Unknown error"}`);
        return;
      }
    }

    const IOrderData: IOrderData = {
      userName: name,
      userEmail: authUser.userEmail,
      products: items
        .filter((item) => item._id)
        .map((item) => ({
          productId: item._id!,
          quantity: item.quantity,
        })),
      totalPrice: total,
      address,
      contactNumber: phone,
      prescriptionImageLink,
      paymentMethod: "cashOnDelivery",
    };

    console.log("Order Details (COD):", IOrderData);

    try {
      const result = await createOrder(IOrderData).unwrap();
      console.log("Order creation response:", result);
      if (result.success) {
        dispatch(clearCart());
        toast("✅ Order placed successfully!");

      } else {
        throw new Error("Order creation failed");
      }
    } catch (error) {
      const orderError = error as OrderError;
      console.error("Failed to create order:", error);
      toast(
        `❌ Order creation failed: ${orderError.data?.message || orderError.message || "Unknown error"}`);
    }
  };

  const handleOnlinePayment = async () => {
    if (!authUser?.userEmail) {
      toast("❌ Please log in to place an order");
      return;
    }
    if (!name || !address || !phone) {
      toast("❌ Please fill all shipping details");
      return;
    }
    if (prescriptionRequiredState && !prescription) {
      toast("❌ Prescription is required");
      return;
    }

    let prescriptionImageLink: string | undefined;
    if (prescription) {
      try {
        console.log("Uploading prescription image...");
        prescriptionImageLink = await postImage(prescription);
        console.log("Prescription image uploaded:", prescriptionImageLink);
      } catch (error) {
        const err = error as Error;
        console.error("Prescription upload failed:", err);
        toast(`❌ Failed to upload prescription image: ${err.message || "Unknown error"}`);
        return;
      }
    }

    const IOrderData: IOrderData = {
      userName: name,
      userEmail: authUser.userEmail,
      products: items
        .filter((item) => item._id)
        .map((item) => ({
          productId: item._id!,
          quantity: item.quantity,
        })),
      totalPrice: total,
      address,
      contactNumber: phone,
      prescriptionImageLink,
      paymentMethod: "sslcommerz",
    };

    console.log("Order Details (Online Payment):", IOrderData);

    try {
      const result = await createOrder(IOrderData).unwrap();
      console.log("Order creation response:", result);
      if (result.success) {
        dispatch(clearCart());
        if (result.PaymentGatewayPageURL) {
          toast("✅ Payment initiated successfully!");
          console.log("Redirecting to PaymentGatewayPageURL:", result.PaymentGatewayPageURL);
          window.location.href = result.PaymentGatewayPageURL; // Use window.location.href for external redirect
        } else {
          throw new Error("Payment gateway URL not provided");
        }
      } else {
        throw new Error("Order creation failed");
      }
    } catch (error) {
      const orderError = error as OrderError;
      console.error("Failed to create order or initiate payment:", error);
      toast(
        `❌ Payment initiation failed: ${orderError.data?.message || orderError.message || "Unknown error"}`);
    }
  };

  if (items.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <div className="bg-white p-8 rounded-xl shadow-xl text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your cart is empty!
            </h2>
            <p className="text-gray-500 mb-6">
              Please go to cart and add medicines first.
            </p>
            <button
              onClick={() => router.push("/cart")}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Go to Cart
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="bg-gray-100 min-h-[70vh] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white shadow-xl rounded-xl p-8">
            <h1 className="text-3xl font-bold text-center text-teal-700 mb-8">
              Checkout
            </h1>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Cart Summary FIRST */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                <h2 className="text-xl font-semibold mb-4 text-teal-700">
                  Order Summary
                </h2>
                <div className="space-y-4 max-h-72 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 border-b pb-3"
                    >
                      <div className="relative w-16 h-16">
                        <Image
                          src={item.image || "/placeholder.png"}
                          alt={item.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} x ${item.price}
                        </p>
                        {item.prescriptionRequired && (
                          <p className="text-xs text-red-500">
                            *Prescription Required
                          </p>
                        )}
                      </div>
                      <p className="font-semibold text-teal-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6 border-t pt-4">
                  <p className="text-xl font-semibold">Total</p>
                  <p className="text-xl font-bold text-teal-700">
                    ${total.toFixed(2)}
                  </p>
                </div>

                {paymentMethod === "Cash on Delivery" ? (
                  <button
                    onClick={handleCODOrder}
                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg text-lg font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Confirm Order"}
                  </button>
                ) : (
                  <button
                    onClick={handleOnlinePayment}
                    className="w-full mt-6 bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-lg text-lg font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Pay with SSLCommerz"}
                  </button>
                )}
              </div>

              {/* Shipping Form SECOND */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                <h2 className="text-xl font-semibold mb-4 text-teal-700">
                  Shipping Details
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <div>
                    <label className="block mb-2 font-medium">
                      Upload Prescription (
                      {prescriptionRequiredState ? "Required" : "Optional"})
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">
                      Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                    >
                      <option>Cash on Delivery</option>
                      <option>Online Payment</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CheckoutPage;