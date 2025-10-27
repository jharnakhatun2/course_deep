import { useState, useRef, useEffect } from "react";
import { BsTypeBold } from "react-icons/bs";
import { CgFormatItalic, CgFormatUnderline } from "react-icons/cg";
import { GrStrikeThrough } from "react-icons/gr";
import { IoIosList } from "react-icons/io";
import { VscListOrdered } from "react-icons/vsc";
import {
  PiCodeSimpleThin,
  PiLinkSimpleLight,
  PiTextAlignCenterThin,
  PiTextAlignLeftThin,
  PiTextAlignRightThin,
} from "react-icons/pi";
import { LiaEdit } from "react-icons/lia";
import { TiDeleteOutline } from "react-icons/ti";
import { LuNotebookText } from "react-icons/lu";

interface EditorState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
}

interface SavedNote {
  title: string;
  content: string;
  timestamp: string;
}

const NotesSection: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);
  const [formatState, setFormatState] = useState<EditorState>({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  });

  const editorRef = useRef<HTMLDivElement>(null);

  const executeCommand = (command: string, value: string = "") => {
    editorRef.current?.focus();
    // Enhanced list handling
    if (command === "insertUnorderedList" || command === "insertOrderedList") {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        let node: Node | null = selection.getRangeAt(0).commonAncestorContainer;
        while (node && node.nodeType !== Node.ELEMENT_NODE) {
          node = node.parentNode;
        }

        const element = node as Element;
        if (element) {
          // If we're in the opposite list type, first break out of it
          if (command === "insertUnorderedList" && element.closest("ol")) {
            document.execCommand("insertOrderedList", false, undefined);
          } else if (command === "insertOrderedList" && element.closest("ul")) {
            document.execCommand("insertUnorderedList", false, undefined);
          }
        }
      }
    }
    document.execCommand(command, false, value);
    updateFormatState();
  };

  // Alternative reliable list implementation
  const handleListInsert = (type: "ul" | "ol") => {
    editorRef.current?.focus();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    // Check if we're already in a list item
    let listItem = range.commonAncestorContainer as Element;
    while (listItem && listItem.nodeName !== "LI" && listItem.parentNode) {
      listItem = listItem.parentNode as Element;
    }

    if (listItem && listItem.nodeName === "LI") {
      // We're in a list item, toggle the list type
      const currentList = listItem.parentNode as Element;
      if (currentList.nodeName === type.toUpperCase()) {
        // Same list type, remove list
        document.execCommand("insertUnorderedList", false, undefined);
        document.execCommand("insertOrderedList", false, undefined);
      } else {
        // Different list type, switch
        if (type === "ul") {
          document.execCommand("insertOrderedList", false, undefined);
          document.execCommand("insertUnorderedList", false, undefined);
        } else {
          document.execCommand("insertUnorderedList", false, undefined);
          document.execCommand("insertOrderedList", false, undefined);
        }
      }
    } else {
      // Not in a list, create new list
      if (type === "ul") {
        document.execCommand("insertUnorderedList", false, undefined);
      } else {
        document.execCommand("insertOrderedList", false, undefined);
      }
    }

    updateFormatState();
  };

  const updateFormatState = () => {
    setFormatState({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikethrough: document.queryCommandState("strikethrough"),
    });
  };

  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  const saveNote = () => {
    if (!title && !content) {
      alert("Please add a title or content before saving!");
      return;
    }

    const noteData: SavedNote = {
      title: title || "Untitled Note",
      content: content || "Empty note",
      timestamp: new Date().toISOString(),
    };

    setSavedNotes([noteData, ...savedNotes]);
    setTitle("");
    setContent("");
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      updateFormatState();
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  const handleEditNote = (index: number) => {
    const noteToEdit = savedNotes[index];
    setTitle(noteToEdit.title);
    editorRef.current!.innerHTML = noteToEdit.content;
    setSavedNotes(savedNotes.filter((_, i) => i !== index));
  };

  const handleDeleteNote = (index: number) => {
    setSavedNotes(savedNotes.filter((_, i) => i !== index));
  };

  const inputStyle =
    "transition-smooth border border-gray-200 rounded p-3 w-full focus:outline-none focus:shadow-[0_0_15px_#c1c1c1] backdrop-blur-lg bg-white/50";
  const toolStyle = "p-1 hover:text-zinc-700 transition-smooth cursor-pointer";

  return (
    <div>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Editor Card */}
        <div className="w-full bg-gray-300/50 border border-gray-300/50 overflow-hidden">
          {/* Title Input */}
          <div className="px-6 pt-6 space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note Title"
              className={inputStyle}
            />
            <div
              ref={editorRef}
              contentEditable
              onInput={handleInput}
              onKeyUp={updateFormatState}
              className={`${inputStyle} h-40 overflow-y-auto `}
              data-placeholder="Write Something Awesome..."
              suppressContentEditableWarning={true}
            />
          </div>

          {/* Toolbar */}
          <div className="px-6 pb-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-1 p-1">
              {/* Text Formatting */}
              <button
                onClick={() => executeCommand("bold")}
                className={`${toolStyle} ${
                  formatState.bold
                    ? "bg-yellow-400/30 text-zinc-500"
                    : "text-slate-400"
                }`}
                title="Bold"
              >
                <BsTypeBold size={18} />
              </button>
              <button
                onClick={() => executeCommand("italic")}
                className={`${toolStyle} ${
                  formatState.italic
                    ? "bg-yellow-400/30 text-zinc-500"
                    : "text-slate-400"
                }`}
                title="Italic"
              >
                <CgFormatItalic size={18} />
              </button>
              <button
                onClick={() => executeCommand("underline")}
                className={`${toolStyle} ${
                  formatState.underline
                    ? "bg-yellow-400/30 text-zinc-500"
                    : "text-slate-400"
                }`}
                title="Underline"
              >
                <CgFormatUnderline size={18} />
              </button>
              <button
                onClick={() => executeCommand("strikeThrough")}
                className={`${toolStyle} ${
                  formatState.strikethrough
                    ? "bg-yellow-400/30 text-zinc-500"
                    : "text-slate-400"
                }`}
                title="Strikethrough"
              >
                <GrStrikeThrough size={18} />
              </button>

              <div className="w-px h-6 bg-slate-700 mx-1" />

              {/* Lists */}
              <button
                onClick={() => handleListInsert("ul")}
                className={`text-slate-400 ${toolStyle}`}
                title="Bullet List"
              >
                <IoIosList size={18} />
              </button>
              <button
                onClick={() => handleListInsert("ol")}
                className={`text-slate-400 ${toolStyle}`}
                title="Numbered List"
              >
                <VscListOrdered size={18} />
              </button>

              <div className="w-px h-6 bg-slate-700 mx-1" />

              {/* Alignment */}
              <button
                onClick={() => executeCommand("justifyLeft")}
                className={`text-slate-400 ${toolStyle}`}
                title="Align Left"
              >
                <PiTextAlignLeftThin size={18} />
              </button>
              <button
                onClick={() => executeCommand("justifyCenter")}
                className={`text-slate-400 ${toolStyle}`}
                title="Align Center"
              >
                <PiTextAlignCenterThin size={18} />
              </button>
              <button
                onClick={() => executeCommand("justifyRight")}
                className={`text-slate-400 ${toolStyle}`}
                title="Align Right"
              >
                <PiTextAlignRightThin size={18} />
              </button>

              <div className="w-px h-6 bg-slate-700 mx-1" />

              {/* Link and Code */}
              <button
                onClick={insertLink}
                className={`text-slate-400 ${toolStyle}`}
                title="Insert Link"
              >
                <PiLinkSimpleLight size={18} />
              </button>
              <button
                onClick={() => executeCommand("formatBlock", "<pre>")}
                className={`text-zinc-400 ${toolStyle}`}
                title="Code Block"
              >
                <PiCodeSimpleThin size={18} />
              </button>
            </div>

            {/* Save Button */}
            <button
              onClick={saveNote}
              className="px-6 py-2 mt-3 cursor-pointer font-semibold uppercase text-sm shadow transition-smooth bg-yellow-500 hover:bg-yellow-600 text-zinc-800 hover:text-white/70"
            >
              Save Note
            </button>
          </div>
        </div>

        {/* Saved Notes Section */}
        {savedNotes.map((note, index) => (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <LuNotebookText className="text-yellow-500" />
              <h2 className="text-xl text-zinc-700">Saved Notes</h2>{" "}
            </div>
            <div className="h-[1px] w-full bg-zinc-500/20 -mt-2" />
          {/* Saved Data */}
          <div
            key={index}
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
              {new Date(note.timestamp).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          </div>
        ))}
      </div>

      <style>{`
  [contenteditable][data-placeholder]:empty:before {
    content: attr(data-placeholder);
    color: #64748b;
    pointer-events: none;
    position: absolute;
  }

  [contenteditable] {
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
  }

  [contenteditable] a {
    color: #a78bfa;
    text-decoration: underline;
  }

  [contenteditable] ul,
  [contenteditable] ol {
    margin-left: 1.5rem;
    padding-left: 1.2rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  [contenteditable] li {
    margin-bottom: 0.25rem;
    line-height: 1.5;
  }

  [contenteditable] ul {
    list-style-type: disc;
  }

  [contenteditable] ol {
    list-style-type: decimal;
  }

  [contenteditable] ul ul,
  [contenteditable] ol ul {
    list-style-type: circle;
  }

  [contenteditable] ol ol,
  [contenteditable] ul ol {
    list-style-type: lower-roman;
  }

  [contenteditable] pre {
    background: rgba(15, 23, 42, 0.5);
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    margin: 0.5rem 0;
    color: #ffffff;
  }

  /* --- Styling for saved notes --- */
  .prose ul, .prose ol {
    margin-left: 1.5rem;
    padding-left: 1rem;
  }

  .prose li {
    list-style-position: outside;
  }

  .prose ul {
    list-style-type: disc;
  }

  .prose ol {
    list-style-type: decimal;
  }
`}</style>
    </div>
  );
};

export default NotesSection;
