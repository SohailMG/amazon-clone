import Header from "../components/Header";
import Image from "next/image";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { useSelector } from "react-redux";
import BasketItem from "../components/BasketItem";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";

function Checkout() {
  const items = useSelector(selectItems);
  const [session] = useSession();
  const total = useSelector(selectTotal);
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left main content */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            
              <h1 className="text-3xl border-b pb-4">
                {items.length === 0
                  ? "Your Amazon Basket is empty"
                  : "Shopping Basket"}
              </h1>
              
            

            {items.map(
              (
                {
                  id,
                  title,
                  price,
                  description,
                  category,
                  image,
                  hasPrime,
                  rating,
                },
                index
              ) => (
                <BasketItem
                  key={id}
                  id={id}
                  rating={rating}
                  hasPrime={hasPrime}
                  title={title}
                  price={price}
                  description={description}
                  category={category}
                  image={image}
                />
              )
            )}
          </div>
        </div>
        {/* Right main content */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal: ({items.length} items):{" "}
                <span className="font-bold">
                  {<Currency quantity={total} currency="GBP" />}
                </span>
              </h2>
              <button
                className={`button mt-2 ${
                  !session &&
                  "bg-gray-300 border-gray-200 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!session}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
