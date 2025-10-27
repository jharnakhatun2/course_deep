import React from "react";

export const NotesSection: React.FC = () => {
  return (
    <div className="bg-[#1b1b2b] p-4 rounded-xl border border-gray-700">
      <h2 className="text-lg font-semibold mb-3">Notes</h2>
      <input
        type="text"
        placeholder="Note Title"
        className="w-full mb-3 px-3 py-2 rounded-lg bg-[#24243a] border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <textarea
        placeholder="Write Something Awesome..."
        className="w-full h-40 px-3 py-2 rounded-lg bg-[#24243a] border border-gray-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <div className="flex justify-end mt-3">
        <button className="bg-purple-600 hover:bg-purple-700 text-sm px-4 py-2 rounded-lg">
          Save Note
        </button>
      </div>
    </div>
  );
};
