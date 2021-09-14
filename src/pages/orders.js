import moment from "moment";
import { getSession, useSession } from "next-auth/client";
import { db } from "../../firebase";
import Header from "../components/Header";
import Order from "../components/Order";
function Orders({ orders }) {
  const [session] = useSession();
  console.log(orders);
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please Sign In to view your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, items, images, timestamp }) => (
              <Order
                key={id}
                name={session?.user.name}
                id={id}
                amount={amount}
                items={items}
                amountShipping={amountShipping}
                images={images}
                timestamp={timestamp}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // Getting logged user's credentials
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }
  //   Firebase db orders
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  //   stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
