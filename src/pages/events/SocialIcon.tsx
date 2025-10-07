
const SocialIcon = () => {
    const iconStyle = "px-3 py-1.5 text-white ";
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Tags:</span>
              <span className="ml-2 text-zinc-500">Online, App Development</span>
            </div>
                {/* Social Icon */}
            <div className="flex items-center gap-3">
              <span className="mr-2 font-medium">Share:</span>
              <div className="flex gap-2">
                <button aria-label="share facebook" className={`bg-blue-600 ${iconStyle}`}>
                  F
                </button>
                <button aria-label="share twitter" className={`bg-sky-500 ${iconStyle}`}>
                  T
                </button>
                <button aria-label="share google" className={`bg-red-600 ${iconStyle}`}>
                  G+
                </button>
                <button aria-label="share more" className={`bg-gray-300 text-gray-700 ${iconStyle}`}>
                  +
                </button>
              </div>
            </div>
          </div>
  )
}

export default SocialIcon