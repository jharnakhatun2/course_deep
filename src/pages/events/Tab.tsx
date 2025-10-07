import { useState, type FC } from "react"



const Tab:FC = () => {
    const [tab, setTab] = useState<"about" | "participants">("about");

  return (
    <div className="flex flex-col md:flex-row gap-4">
              <nav className="md:w-48 border rounded-md overflow-hidden">
                <button
                  onClick={() => setTab("about")}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
                    tab === "about" ? "bg-white font-semibold" : "bg-gray-50"
                  }`}
                >
                  Discuss About
                </button>
                <button
                  onClick={() => setTab("participants")}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
                    tab === "participants" ? "bg-white font-semibold" : "bg-gray-50"
                  }`}
                >
                  Participants
                </button>
              </nav>

              <div className="flex-1 border rounded-md p-6 bg-white">
                {tab === "about" && (
                  <ul className="list-disc pl-5 space-y-3 text-gray-700">
                    <li>Thomas Edison may have been behind the invention.</li>
                    <li>
                      Edison worked alongside partners, both financial and commercial, to get his best
                      inventions off the ground.
                    </li>
                    <li>Battling challenging cost targets and the need to build.</li>
                    <li>Partnership with a supplier or original equipment manufacturer.</li>
                  </ul>
                )}

                {tab === "participants" && (
                  <div className="text-gray-700">
                    <p className="mb-2">Participants</p>
                    <ol className="list-decimal pl-5">
                      <li>John Doe — Lead Instructor</li>
                      <li>Jane Smith — Frontend Engineer</li>
                      <li>Ali Ahmed — Guest Speaker</li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
  )
}

export default Tab