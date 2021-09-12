import Image from "next/image";
import {
  SearchIcon,
  MenuIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";

function Header() {

    const [session,loading] = useSession();
    
  return (
    <header>
      {/* top header */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            src={"https://links.papareact.com/f90"}
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        {/* Search */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500 cursor-pointer">
          <input
            type="text"
            placeholder="Search"
            className="p-2 h-full w-6 flex-grow rounded flex-shrink rounded-l-md outline-none px-4"
          />
          <SearchIcon className="h-12 p-4 " />
        </div>
        {/* Right header */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div onClick={!session ?  signIn : signOut} className="link">
            <p>
                {session ? `Hello ${session.user.name}` : 'Sign In'}
            </p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div className="link flex relative items-center">
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 rounded-full text-center text-black font-bold">
              2
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline-flex mt-2 font-extrabold md:text-sm">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* bottom header */}
      <div className="text-white space-x-3 p-2 pl-6 bg-amazon_blue-light text-sm flex items-center lg:justify-between font-bold">
        <p className="link flex items-center ">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Grocery</p>
        <p className="link">Health & Personal Care</p>
        <p className="link">Best Sellers</p>
        <p className="link">Prime Video</p>
        <p className="link hidden lg:inline-flex">Free Delivery</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Gift Cards & Top Up</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Toys & Games</p>
        <p className="link hidden lg:inline-flex">Beauty</p>
        <p className="link hidden lg:inline-flex">Pet Supplies</p>
      </div>
    </header>
  );
}

export default Header;
