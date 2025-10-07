
const SocialIcon = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Tags:</span>
              <span className="ml-2">Online, App Development</span>
            </div>
                {/* Social Icon */}
            <div className="flex items-center gap-3">
              <span className="mr-2">Share:</span>
              <div className="flex gap-2">
                <button aria-label="share facebook" className="p-2 bg-blue-600 text-white rounded">
                  F
                </button>
                <button aria-label="share twitter" className="p-2 bg-sky-500 text-white rounded">
                  T
                </button>
                <button aria-label="share google" className="p-2 bg-red-600 text-white rounded">
                  G+
                </button>
                <button aria-label="share more" className="p-2 bg-gray-300 text-gray-700 rounded">
                  +
                </button>
              </div>
            </div>
          </div>
  )
}

export default SocialIcon