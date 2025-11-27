import { LiaEdit } from "react-icons/lia";
import { TiDeleteOutline } from "react-icons/ti";
import type { FC } from "react";

interface SavedNote {
  id: string;
  title: string;
  content: string;
  timestamp?: string;
}

interface DisplayNotesProps {
  savedNotes: SavedNote[];
  handleEditNote: (index: number) => void;
  handleDeleteNote: (index: number) => void;
}

const DisplayNotes: FC<DisplayNotesProps> = ({
  savedNotes,
  handleEditNote,
  handleDeleteNote,
}) => {
  return (
    <div>
      {savedNotes.map((note, index) => (
        <div key={note.id} className="space-y-3 mt-5">
          {/* Saved Data */}
          <div
            className="relative bg-zinc-800/50 backdrop-blur-xl shadow-xl border border-white p-6 hover:border-yellow-500/50 transition-smooth"
          >
            {/* Title and Menu */}
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-slate-200">
                {note.title}
              </h3>

              {/* Dropdown Menu */}
              <div className="flex items-center gap-1">
                <div onClick={() => handleEditNote(index)}>
                  <LiaEdit className="text-white hover:text-yellow-400 text-2xl cursor-pointer transition-smooth" />
                </div>
                <div onClick={() => handleDeleteNote(index)}>
                  <TiDeleteOutline className="text-zinc-900 hover:text-teal-400 text-2xl cursor-pointer transition-smooth" />
                </div>
              </div>
            </div>

            {/* Note Content */}
            <div
              className="text-yellow-400 prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: note.content }}
            />

            {/* Date */}
            <span className="text-sm text-slate-300">
              Last Update :{" "}
              {note.timestamp
                ? new Date(note.timestamp).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
                : "Unknown"}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayNotes