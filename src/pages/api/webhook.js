import { buffer } from "micro";
import * as admin from "firebase-admin";

// Secure connection to firebase
const serviceAccount = require("../../../permissions.json");
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// Establish connection to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  console.log("Fulfilling order : ", session);
  //   FIXME Problem with firebase not storing the order in
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldPath.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: order:${session.id}`);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const signature = req.headers["stripe-signature"];

    let event;

    //   Verifying event is from stripe
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      );
    } catch (error) {
      console.log("ERROR", error.message);
      return res.status(400).send("Webhook error");
    }

    //   Handle checkout session completed event
    console.log(event.type === "checkout.session.completed");
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Fulfilling the order
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((error) => res.status(400).send(error.message));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
