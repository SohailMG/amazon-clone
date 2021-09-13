import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
function SuggestedProduct({ id, title, price, description, category, image }) {
    const [rating] = useState(
      Math.floor(Math.random() * (5 - 1 + 1) + 1)
    );
     const [hasPrime, setHasPrime] = useState(Math.random() < 0.5);
     const dispatch = useDispatch()

      const addItemToBasket = () => {
        const product = {
          id,
          title,
          price,
          description,
          category,
          image,
          rating,
          hasPrime,
        };

        dispatch(addToBasket(product));
      };
  return (
    <div className="flex items-center mt-2">
      {/* Left  */}
      <div className="p-2 m-2">
        <Image src={image} width={60} height={60} objectFit="contain" />
      </div>
      {/* Right */}
      <div className="w-36 flex flex-col">
        <small className="line-clamp-1 text-xs text-[#0180B6]">{title}</small>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((rating, i) => (
              <StarIcon className="h-5 text-yellow-500" key={i} />
            ))}
          <small className="text-[#52B2D9]">
            {Math.floor(Math.random() * (100 - 1 + 1) + 1)}
          </small>
        </div>
        <div className="flex items-center">
          <p className="text-[#B12605]">£{price}</p>
          {hasPrime && (
            <div className="flex items-center space-x-2 -mt-1">
              <img
                src="https://links.papareact.com/fdw"
                alt=""
                className="w-12"
              />
            </div>
          )}
        </div>
        <button className="rounded-xl bg-[#FED815] text-xs w-24 py-1" onClick={addItemToBasket}>
          Add to basket
        </button>
      </div>
    </div>
  );
}

export default SuggestedProduct;
