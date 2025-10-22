
const ScrollBtn = () => {
  return (
    <button className="fixed bottom-8 right-8 bg-yellow-400 hover:bg-yellow-500 text-white p-4 rounded shadow-lg">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
  )
}

export default ScrollBtn