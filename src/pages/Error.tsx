import Button from "../ult/button/Button"


const Error = () => {
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
			<h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
				<span className="sr-only">Error</span>404
			</h2>
			<p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
			<p className="mt-4 mb-8 dark:text-gray-600">But dont worry, you can find plenty of other things on our homepage.</p>
			<Button
            url="/"
            className="bg-yellow-500 hover:bg-yellow-400 text-zinc-600 hover:text-white shadow-[0_0_15px_rgba(255,221,51,0.3)]
 hover:shadow-[0_0_25px_rgba(255,221,51,0.5)] border border-yellow-400"
          >
            Back To Home
          </Button>
		</div>
	</div>
</section>
  )
}

export default Error