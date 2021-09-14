import moment from "moment";
import Currency from "react-currency-formatter";
function Order({ id, amount, amountShipping, items, images, timestamp, name }) {
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("DD MMM YYY")}</p>
        </div>
        <div>
          <p className="font-bold text-xs">TOTAL</p>
          <p>
            <Currency quantity={amount} currency="GBP" /> - Next Day Delivery{" "}
            <Currency quantity={amountShipping} currency="GBP" />
          </p>
        </div>
        <div>
          <p className="font-bold text-xs">DISPATCHED TO</p>
          <p className="text-[#047184] hover:underline cursor-pointer">
            {name}
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {items.length} items
        </p>
        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          ORDER # {id}
        </p>
      </div>
      <div className="flex p-5 sm:p-10 justify-between">
        <div className="flex space-x-6 overflow-x-auto">
          {images.map((image,index) => (
            <img src={image} alt="" className="h-20 object-contain sm:h-32" key={index}/>
          ))}
        </div>
        <div className="flex flex-col">
          <button className="order_btn mb-4">Track package</button>
          <button className="order_btn">Return items</button>
          <button className="order_btn">Share gift receipt</button>
          <button className="order_btn">Leave seller feedback</button>
          <button className="order_btn">Write product review</button>
        </div>
      </div>
    </div>
  );
}

export default Order;
