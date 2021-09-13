import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../slices/basketSlice";
function BasketItem({
  id,
  title,
  description,
  price,
  rating,
  image,
  category,
  hasPrime,
}) {
  const dispatch = useDispatch();
  // removing item from redux store
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({id}));
  };
  return (
    <div className="grid grid-cols-5">
      <Image src={image} width={200} height={200} objectFit="contain" />
      {/* Middle checkout */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>

        <div className="flex">
          {Array(rating)
            .fill()
            .map((star, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs mt-2 line-clamp-3 mb-2">{description}</p>
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              src="https://links.papareact.com/fdw"
              alt="Prime"
              loading="lazy"
              className="w-12"
            />
            <p className="text-xs text-gray-500 flex-grow">
              FREE Next-day Delivery
            </p>
          </div>
        )}
        <p className="font-bold text-xl">
          <Currency quantity={price} currency="GBP" />
        </p>
        <div className="flex space-x-2 text-xs text-[#0079B6] mt-10">
          <p
            className="link border-l border-gray-200 pl-2"
            onClick={removeItemFromBasket}
          >
            Delete
          </p>
          <p className="link border-l border-gray-200 pl-2">Save for later</p>
          <p className="link border-l border-gray-200 pl-2">
            See more like this
          </p>
        </div>
      </div>
    </div>
  );
}

export default BasketItem;
