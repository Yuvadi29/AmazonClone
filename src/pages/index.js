import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <div className="bg-[#E3E6E6]">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header />

      <main className="max-w-screen-2xl">
        <Banner />
        {/* We pass the props defined here to the ones we have defined in the ProductFeed.jsx file */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

// For getting all the products we will use FakeStoreApi. Using NextJs we use Server Side Rendering where the server iteself renders the page and gives us the response back rather than the client rendering the page.

// For SSR we use GetServerSideProps
export async function getServerSideProps(context) {
  // We declare a variable and store the input from the API into that variable
  const products = await fetch("https://fakestoreapi.com/products").then((response) => response.json());

  // Returning the props and add a key value pair to determine the specefic props
  return {
    props: {
      products,
    }
  }
}