import image from "../../assets/img/hero/hero-3.webp";
import { RiDeleteBin5Fill } from "react-icons/ri";

const ProductList = () => {
  return (
      <div className="overflow-x-auto">
        <table className="w-full p-6 text-xs whitespace-nowrap text-center">
          <colgroup>
            <col className="w-5" />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="w-5" />
          </colgroup>
          <thead>
            <tr className="bg-zinc-400 text-white ">
              <th className="p-2">Items</th>
              <th className="p-2">Name</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Price</th>
              <th className="p-2">Remove</th>
            </tr>
          </thead>
          <tbody className="border-b border-gray-300/80 text-center">
            <tr>
              <td className="font-medium">
                <img
                  src={image}
                  alt="course"
                  className="w-52 h-10 object-cover mx-auto my-3"
                />
              </td>
              <td className="px-3 py-2">
                <p className="font-medium pb-2">Dwight Adams</p>
              </td>
              <td className="px-3 py-2">
                <span>3</span>
                
              </td>
              <td className="px-3 py-2 ">
                <p>$20</p>
                
              </td>             
            
            <td className="px-3 py-2">
              <div className="flex justify-center items-center h-full">
                <RiDeleteBin5Fill className="w-4 h-4 text-red-600 cursor-pointer hover:text-red-800 transition-colors duration-200" />
              </div>
            </td>

            </tr>
          </tbody>
        
        </table>
      </div>
  );
};

export default ProductList;
