import { CheckIcon } from "@heroicons/react/solid";
import Header from "../components/Header";
import {useRouter} from 'next/router'
function Success() {
    const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />

      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 border-2 shadow-md border-[#018B00]">
          <div className="flex items-center space-x-2 mb-5">
            <CheckIcon className="text-[#018B00] h-10" />
            <h1 className="text-[#018B00] text-3xl">
              Thank you, your order has been placed
            </h1>
          </div>
          <p>
            An email confirmation has been sent to you <br />
            <b className="text-[#018B00]">New!</b> Get shipment notifications on
            your mobile device with the free Amazon app
          </p>
          <button onClick={()=> router.push('/orders')} className="button mt-8">View my order</button>
        </div>
      </main>
    </div>
  );
}

export default Success;
