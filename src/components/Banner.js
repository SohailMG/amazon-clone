import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
  return (
    <div className="relative">
        {/* <div className="absolute w-4 h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20"/> */}
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicator={false}
        showThumbs={false}
        interval={5000}
      >
        <div className="">
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/I/61y91+10krL._SX3000_.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/I/61T32IBYDtL._SX3000_.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/I/81eDxYRSJgL._SX3000_.jpg"
            alt=""
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
