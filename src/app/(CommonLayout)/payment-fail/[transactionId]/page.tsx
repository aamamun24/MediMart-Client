import Link from "next/link";

const PaymentFailed = () => {
    return (
        <div className='w-full min-h-[70vh] flex flex-col gap-5 justify-center items-center'>
            Payment Failed ❌
            <Link href="/"><button className="bg-blue-900 text-white p-2">Shop More</button></Link>
        </div>
    );
};

export default PaymentFailed;