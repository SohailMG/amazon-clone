import Header from "../components/Header";
import Image from "next/image";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { useSelector } from "react-redux";
import BasketItem from "../components/BasketItem";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { db } from "../../firebase";
import Product from "../components/Product";
import SuggestedProduct from "../components/SuggestedProduct";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout({ products }) {
  const items = useSelector(selectItems);
  const [session] = useSession();
  const total = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    //   Calling backend to create checkout session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    // Redirect user to the checkout page
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left main content */}
        <div className="flex-grow m-5 shadow-sm">
          <div className="flex space-x-10 bg-[#FFFF01] p-4 m-4 items-center">
            <button className="rounded-lg border border-gray-400 bg-white text-black py-1 text-sm px-2">
              Learn more
            </button>
            <p>{`${
              session ? session.user.name : ""
            } pre-approval with YES or NO  in 60 seconds for ocean Credit Card. Get up to £1,500 credit limit`}</p>
          </div>
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
        <div>
          <div className="flex flex-col bg-white p-10 shadow-md">
            {items.length >= 0 && (
              <>
                <h2 className="whitespace-nowrap">
                  Subtotal: ({items.length} items):{" "}
                  <span className="font-bold">
                    {<Currency quantity={total} currency="GBP" />}
                  </span>
                </h2>
                <button
                  role="link"
                  onClick={createCheckoutSession}
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
          {/* Suggestions */}
          <div className="bg-white p-4 mt-4 shadow-md font-bold text-sm">
            <p>More items to explore</p>
            {/* Random suggestions */}
            {products
              .slice(0, 4)
              .map(
                ({ id, title, price, description, category, image }, index) => (
                  <SuggestedProduct
                    id={id}
                    title={title}
                    price={price}
                    category={category}
                    image={image}
                    description={description}
                  />
                )
              )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;

export async function getServerSideProps(context) {
  const products = await db.collection("products").get();
  const docs = products.docs.map((product) => ({
    id: product.id,
    ...product.data(),
    timestamp: null,
  }));

  return {
    props: {
      products: docs,
    },
  };
}
