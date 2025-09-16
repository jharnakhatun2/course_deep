import imgMobile from "../../assets/img/half.webp";

const Banner1 = () => {
  return (
    <section className="relative py-5 bg-gradient-to-b from-gray-50 to-zinc-400 text-zinc-700">
      <img
          src={imgMobile}
          alt="mobile app preview"
          className="absolute bottom-0 left-88 "
        />
      <div className="lg:max-w-7xl mx-auto px-4 flex justify-end items-start">
        {/* Image on top */}

        {/* Text & Buttons below */}
        <div className="w-full lg:w-1/2 lg:text-left flex flex-col justify-end">
          <h1 className="text-3xl font-bold">Our Mobile App</h1>

          <p className=" text-gray-700 w-3/6 my-3">
            Download on the App Store or Google Play!
          </p>

          <div className="flex flex-col sm:flex-row justify-start items-start gap-4">
            {/* Google Play Button */}
            <button className="flex items-center px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 mr-3">
                <path d="M5.416 2.328l7.52 7.83c.197.205.524.205.721 0l1.523-1.584c.226-.235.175-.617-.109-.777-3.933-2.225-8.808-4.986-9.654-5.469zM3.141 2.848c-.085.198-.14.415-.14.656v17.088c0 .197.044.379.109.549l8.467-8.816c.186-.193.186-.498 0-.692L3.141 2.848zM17.443 9.258c-.108.016-.22.066-.299.148L15.016 11.633c-.186.193-.186.498 0 .692l2.119 2.205c.158.165.411.2.609.088 1.483-.84 2.483-1.405 2.483-1.405.499-.303.78-.769.773-1.277-.008-.496-.297-.954-.775-1.225-.061-.034-1.037-.587-2.461-1.393-.099-.056-.212-.076-.32-.061zM13.297 13.645c-.131 0-.263.052-.362.155L5.475 21.566c1.282-.729 5.854-3.317 9.576-5.424.284-.161.335-.543.109-.779l-1.504-1.565c-.099-.102-.229-.154-.36-.154z"/>
              </svg>
              <span className="flex flex-col items-start">
                <span className="text-xs">GET IT ON</span>
                <span className="font-semibold">Google Play</span>
              </span>
            </button>

            {/* App Store Button */}
            <button className="flex items-center px-5 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-6 h-6 mr-3">
                <path d="M44.527 34.75c-1.078 2.395-1.598 3.465-2.985 5.578-1.941 2.953-4.679 6.64-8.062 6.664-3.012.027-3.789-1.965-7.879-1.93-4.086.02-4.937 1.949-7.953 1.918-3.387-.032-5.977-3.352-7.918-6.301-5.43-8.27-6.004-17.965-2.648-23.121 2.375-3.657 6.128-5.805 9.656-5.805 3.594 0 5.852 1.973 8.821 1.973 2.883 0 4.637-1.977 8.793-1.977 3.141 0 6.461 1.711 8.836 4.664-8.766 4.258-7.504 15.348-.66 18.317zM31.195 8.469c1.512-1.941 2.66-4.68 2.242-7.469-2.465.168-5.348 1.742-7.031 3.781-1.528 1.859-2.793 4.617-2.301 7.285 2.691.086 5.477-1.52 7.09-3.597z"/>
              </svg>
              <span className="flex flex-col items-start">
                <span className="text-xs">Download on the</span>
                <span className="font-semibold">App Store</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner1;
