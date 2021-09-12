import Image from "next/image";
import {
  SearchIcon,
  MenuIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
function Header() {
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
          <div className=" link">
            <p>Hello Sohail</p>
            <p>Account & Lists</p>
          </div>
          <div className=" link">
            <p>Returns</p>
            <p>& Orders</p>
          </div>
          <div className=" link">
            <ShoppingCartIcon className="h-10" />
            <p>Basket</p>
          </div>
        </div>
      </div>
      {/* bottom header */}
      <div></div>
    </header>
  );
}

export default Header;
