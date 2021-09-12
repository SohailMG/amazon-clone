import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import { db } from "../../firebase";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        {/* Bannar */}
        <Banner />

        {/* Products */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

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
