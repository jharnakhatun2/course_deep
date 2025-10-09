import image from "../../assets/img/hero/hero-3.webp";

const ProductList = () => {
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center border-b border-gray-300 ">
        <div className="font-medium relative">
          <img
            src={image}
            alt="course"
            className="w-20 object-cover mx-auto my-2"
          />
          <span className="absolute top-0 -right-6 border w-5 h-5 rounded-full flex items-center justify-center text-black">
            3
          </span>
        </div>
        <div className="px-3 py-2">
          <p>Dwight Adams</p>
        </div>

        <div className="font-bold">
          <p>$20</p>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
