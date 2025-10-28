import { useState, useRef, useEffect } from "react";


import FormattingTolls from "./FormattingTolls";
import DisplayNotes from "./DisplayNotes";

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

  // Command Execution formatting tools
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

  // Alternative reliable list implementation for formatting tools
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

  // Handle Insert Link for formatting tools
  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  // Handle Save Note
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

  // Edit save data
  const handleEditNote = (index: number) => {
    const noteToEdit = savedNotes[index];
    setTitle(noteToEdit.title);
    editorRef.current!.innerHTML = noteToEdit.content;
    setSavedNotes(savedNotes.filter((_, i) => i !== index));
  };

  // Delete save data
  const handleDeleteNote = (index: number) => {
    setSavedNotes(savedNotes.filter((_, i) => i !== index));
  };

  const inputStyle =
    "transition-smooth border border-gray-200 rounded p-3 w-full focus:outline-none focus:shadow-[0_0_15px_#c1c1c1] backdrop-blur-lg bg-white/50";

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

          {/* Formatting Toolbar */}
          <div className="px-6 pb-6 flex items-center justify-between gap-4 flex-wrap">
            <FormattingTolls
              executeCommand={executeCommand}
              formatState={formatState}
              handleListInsert={handleListInsert}
              insertLink={insertLink}
            />
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
        <DisplayNotes handleEditNote={handleEditNote} handleDeleteNote={handleDeleteNote} savedNotes={savedNotes} />
      </div>
    </div>
  );
};

export default NotesSection;
